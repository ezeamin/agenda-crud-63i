// -----------------------------------------
// 1. Seleccion de elementos
// -----------------------------------------

const botonSalir = document.getElementById("boton-salir");

// -----------------------------------------
// 2. Agregar boton de salir si esta logueado
// -----------------------------------------

const estaLogueado = JSON.parse(sessionStorage.getItem("estaLogueado"));
if (estaLogueado) {
  botonSalir.classList.remove("d-none");
}

// -----------------------------------------
// 2. Lógica del Logout
// -----------------------------------------

botonSalir.addEventListener("click", () => {
  swal
    .fire({
      title: "¿Está seguro?",
      text: "Esta acción cerrará la sesión actual",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar",
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Resetear valores
        sessionStorage.setItem("estaLogueado", false);
        sessionStorage.setItem("usuario", null);

        // Esconder boton
        botonSalir.classList.add("d-none");

        // Redireccionar a home
        window.location.href = "../index.html";
      }
    });
});
