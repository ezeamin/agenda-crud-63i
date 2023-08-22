import { obtenerContactosDeLS } from '../utils.js';
import { Contacto } from './Contacto.js';
import {
  cancelarEdicion,
  guardarContactoEnLS,
  recargarTabla,
} from './adminUtils.js';

export const añadirContacto = (nombre, numero, email, imagen, notas) => {
  // Crear el contacto
  const nuevoContacto = new Contacto(nombre, numero, email, imagen, notas);

  // Agregarlo a la lista
  guardarContactoEnLS(nuevoContacto);

  // Mensaje de exito
  swal.fire({
    icon: 'success',
    title: 'Contacto agregado correctamente',
    showConfirmButton: false,
    timer: 1500,
  });
};

export const editarContacto = (nombre, numero, email, imagen, notas) => {
  // 1. Traer la lista de contactos y el codigo
  const codigo = sessionStorage.getItem('codigoContacto');
  const contactos = obtenerContactosDeLS();

  // 2. Verificar que el contacto exista
  const contactoSeleccionado = contactos.find(
    (contacto) => contacto.codigo === codigo
  );

  if (!contactoSeleccionado) {
    swal.fire({
      icon: 'error',
      title: 'Ocurrio un error',
      text: 'No se pudo encontrar el contacto',
      showConfirmButton: false,
      timer: 1500,
    });

    cancelarEdicion();

    // Evitar que la funcion continúe
    return;
  }

  // 3. Crear el contacto con los nuevos datos
  const contactoEditado = new Contacto(
    nombre,
    numero,
    email,
    imagen,
    notas,
    codigo
  );

  // 4. Actualizar el array de contactos (.map devuelve un nuevo arreglo)
  const contactosActualizados = contactos.map((contacto) => {
    // solo en el caso del contacto a editarse entra en el if
    // en el resto de los casos (else) devuelve el contacto sin modificar al nuevo arreglo

    // .map tiene que devolver, en el callback, el elemento que va a ir en el nuevo arreglo

    if (contacto.codigo === codigo) {
      return contactoEditado;
    } else {
      return contacto;
    }
  });

  // 5. Guardar el nuevo array en localStorage
  localStorage.setItem('contactos', JSON.stringify(contactosActualizados));

  // 6. Mensaje de exito
  swal.fire({
    icon: 'success',
    title: 'Contacto editado correctamente',
    showConfirmButton: false,
    timer: 1500,
  });

  // 7. Resetear al estado anterior
  cancelarEdicion();
};

export const eliminarContacto = (codigo) => {
  // Siempre confirmar la eliminacion
  swal
    .fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar el contacto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        // 1. Traer la lista de contactos
        const contactos = obtenerContactosDeLS();

        // 2. Filtrar el contacto a eliminar
        const contactosActualizados = contactos.filter(
          (contacto) => contacto.codigo !== codigo
        );

        // 3. Guardar el nuevo array en localStorage
        localStorage.setItem(
          'contactos',
          JSON.stringify(contactosActualizados)
        );

        // 4. Recargar la tabla
        recargarTabla();

        // 5. Mensaje de exito
        swal.fire({
          icon: 'success',
          title: 'Contacto eliminado correctamente',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
};
