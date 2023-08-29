'use strict';

import { User, UserWithoutPassword } from './User.js';
import { validatePassword, validateUsername } from './validators.js';

// -----------------------------------------
// 1. Proteger ruta
// -----------------------------------------

// # Es necesario parsear, porque no es lo mismo "false" (string) que false (booleano)

const estaLogueado = JSON.parse(sessionStorage.getItem('estaLogueado'));
if (estaLogueado) {
  // Si está logueado, no debería poder acceder al login
  // y debería ser redireccionado a la pagina de admin
  window.location.href = './admin.html';
}

// -----------------------------------------
// 2. Creacion del usuario por defecto (admin)
// -----------------------------------------

// # Este paso no es necesario en una aplicacion real,
// # ya que los usuarios estarían en una base de datos
// # protegida, y no en el codigo fuente.

const usuarioAdmin = new User('admin', 'admin');

// -----------------------------------------
// 3. Seleccion de elementos
// -----------------------------------------

const formLogin = document.getElementById('form-login');
const campoUsuario = document.getElementById('input-usuario');
const campoContraseña = document.getElementById('input-contraseña');
const alertElement = document.getElementById('alert-login');

// # No es necesario manejar eventos blur, ya que
// # las validaciones solo se van a realizar al enviar el form

// -----------------------------------------
// 4. Event listener del form
// -----------------------------------------

formLogin.addEventListener('submit', (e) => {
  // Evitar que el form se envie refrescando la página
  e.preventDefault();

  // Traer los valores de los inputs
  const usuario = campoUsuario.value;
  const contraseña = campoContraseña.value;

  // Validar los inputs
  // Este método se explicó en ../admin/app.js
  // Puede reemplazarse con un simple if anidando condiciones con &&
  const isValidArray = [
    validateUsername(usuario, campoUsuario),
    validatePassword(contraseña, campoContraseña),
  ];

  const isValid = isValidArray.every(Boolean);

  // Si no es valido, mostrar los errores en los campos
  // (esta logica esta en validators.js, no hay que agregar
  // mensajes de error acá).
  if (!isValid) {
    // No hay más que hacer en esta funcion, asi que
    // evitamos que se ejecute el resto del codigo.
    return;
  }

  // Testear contra usuario "admin" por defecto (Estas
  // credenciales estarían en una base de datos protegida)
  if (
    usuario === usuarioAdmin.usuario &&
    contraseña === usuarioAdmin.contraseña
  ) {
    // Ocultar alert de error y resetear clases de los campos
    alertElement.classList.add('d-none');
    campoUsuario.classList.remove('is-invalid');
    campoContraseña.classList.remove('is-invalid');

    // Guardar informacion del usuario, sin contraseña
    // (en este caso, este usuario es identico al usuario "admin"
    // antes creado, pero en una aplicacion real, el usuario
    // tendría otros datos).
    const user = new UserWithoutPassword(usuario);

    // Guardar en sessionStorage
    // estaLogueado va a permitir proteger la ruta
    // usuario va a permitir acceder a la informacion del usuario más adelante
    sessionStorage.setItem('estaLogueado', true);
    sessionStorage.setItem('usuario', JSON.stringify(user));

    swal
      .fire({
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 1500,
      })
      .then(() => {
        // Despues de 1500ms, redireccionar a la pagina de admin
        window.location.href = './admin.html';
      });
  } else {
    // Si las credenciales no coinciden, mostrar el alert de error
    alertElement.classList.remove('d-none');
  }
});
