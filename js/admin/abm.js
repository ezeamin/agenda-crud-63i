"use strict";

import { obtenerContactosDeLS } from "../utils.js";
import { Contacto } from "./Contacto.js";
import {
  cancelarEdicion,
  cargarTabla,
  guardarContactoEnLS,
} from "./adminUtils.js";

export const añadirContacto = (nombre, numero, email, imagen, notas) => {
  // 1. Crear el contacto
  const nuevoContacto = new Contacto(nombre, numero, email, imagen, notas);

  // 2. Agregarlo a la lista
  guardarContactoEnLS(nuevoContacto);

  // 3. Mensaje de exito
  swal.fire({
    icon: "success",
    title: "Contacto agregado correctamente",
    showConfirmButton: false,
    timer: 1500,
  });
};

export const editarContacto = (nombre, numero, email, imagen, notas) => {
  // 1. Traer la lista de contactos y el codigo
  const codigo = sessionStorage.getItem("codigoContacto");
  const contactos = obtenerContactosDeLS();

  // 2. Verificar que el contacto exista
  const contactoSeleccionado = contactos.find(
    (contacto) => contacto.codigo === codigo,
  );

  // 3. Si no existe, mostrar error y resetear al estado anterior
  // Esto es improbable, pero puede suceder.
  if (!contactoSeleccionado) {
    swal.fire({
      icon: "error",
      title: "Ocurrio un error",
      text: "No se pudo encontrar el contacto",
      showConfirmButton: false,
      timer: 1500,
    });

    // Resetear al estado anterior
    cancelarEdicion();

    // Evitar que la funcion continúe
    return;
  }

  // 4. Crear el contacto con los nuevos datos
  const contactoEditado = new Contacto(
    nombre,
    numero,
    email,
    imagen,
    notas,
    codigo,
  );

  // 5. Actualizar el array de contactos (.map devuelve un nuevo arreglo)
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

  // 6. Guardar el nuevo array en localStorage
  localStorage.setItem("contactos", JSON.stringify(contactosActualizados));

  // 7. Mensaje de exito
  swal.fire({
    icon: "success",
    title: "Contacto editado correctamente",
    showConfirmButton: false,
    timer: 1500,
  });

  // 8. Resetear al estado anterior
  cancelarEdicion();
};

export const eliminarContacto = (codigo) => {
  // Siempre confirmar la eliminacion
  swal
    .fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar el contacto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    })
    .then((result) => {
      if (result.isConfirmed) {
        // 1. Traer la lista de contactos
        const contactos = obtenerContactosDeLS();

        // 2. Filtrar el contacto a eliminar
        const contactosActualizados = contactos.filter(
          (contacto) => contacto.codigo !== codigo,
        );

        // 3. Guardar el nuevo array en localStorage
        localStorage.setItem(
          "contactos",
          JSON.stringify(contactosActualizados),
        );

        // 4. Recargar la tabla
        cargarTabla();

        // 5. Mensaje de exito
        swal.fire({
          icon: "success",
          title: "Contacto eliminado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
};
