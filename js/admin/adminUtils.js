"use strict";

import { obtenerContactosDeLS } from "../utils.js";
import { eliminarContacto } from "./abm.js";

export const guardarContactoEnLS = (contacto) => {
  const contactos = obtenerContactosDeLS();

  contactos.push(contacto);

  localStorage.setItem("contactos", JSON.stringify(contactos));
};

export const cargarContactoEnTabla = (contacto, index, tbody) => {
  const tr = document.createElement("tr");

  // INDICE ------------------------------------------------------

  const tdIndex = document.createElement("td");
  tdIndex.innerText = index + 1;
  tr.appendChild(tdIndex);

  // IMAGEN ------------------------------------------------------

  const tdImagen = document.createElement("td");
  const imagen = document.createElement("img");
  imagen.src = contacto.imagen;
  imagen.alt = contacto.nombre;
  imagen.width = 100;
  imagen.height = 100;
  imagen.classList.add("imagen-contacto");
  tdImagen.appendChild(imagen);
  tr.appendChild(tdImagen);

  // NOMBRE ------------------------------------------------------

  const tdNombre = document.createElement("td");
  tdNombre.innerText = contacto.nombre;
  tr.appendChild(tdNombre);

  // NUMERO ------------------------------------------------------

  const tdNumero = document.createElement("td");
  tdNumero.innerText = contacto.numero;
  tr.appendChild(tdNumero);

  // EMAIL ------------------------------------------------------

  const tdEmail = document.createElement("td");
  tdEmail.innerText = contacto.email;
  tr.appendChild(tdEmail);

  // NOTAS ------------------------------------------------------

  const tdNotas = document.createElement("td");
  tdNotas.innerText = contacto.notas;
  tr.appendChild(tdNotas);

  // ACCIONES ------------------------------------------------------

  // # Este div cumple propósitos estéticos unicamente

  const tdAcciones = document.createElement("td");
  const divAcciones = document.createElement("div");
  divAcciones.classList.add(
    "d-flex",
    "flex-column",
    "flex-md-row",
    "justify-content-end",
    "gap-2",
    "h-100",
  );

  const botonEditar = document.createElement("button");
  botonEditar.classList.add("btn", "btn-warning", "btn-sm");
  botonEditar.innerText = "Editar";
  botonEditar.onclick = () => {
    prepararEdicionContacto(contacto.codigo);
  };
  divAcciones.appendChild(botonEditar);

  const botonEliminar = document.createElement("button");
  botonEliminar.classList.add("btn", "btn-danger", "btn-sm");
  botonEliminar.innerText = "Eliminar";
  botonEliminar.onclick = () => {
    eliminarContacto(contacto.codigo);
  };
  divAcciones.appendChild(botonEliminar);

  tdAcciones.appendChild(divAcciones);
  tr.appendChild(tdAcciones);

  tbody.appendChild(tr);

  // OTRA MANERA - NO RECOMENDABLE ------------------------------
  //   tr.innerHTML = `
  //         <td>${index + 1}</td>
  //         <td><img src=${contacto.imagen} alt=${contacto.nombre} class="imagen-contacto" width="100" height="100"/></td>
  //         <td>${contacto.nombre}</td>
  //         <td>${contacto.numero}</td>
  //         <td>${contacto.email}</td>
  //         <td>${contacto.notas}</td>
  //         <td>
  //           <div class="d-flex flex-column flex-md-row justify-content-end gap-2 h-100">
  //             <button class="btn btn-warning btn-sm" onclick="prepararEdicionContacto(${
  //               contacto.codigo
  //             })">
  //             Editar
  //             </button>
  //             <button class="btn btn-danger btn-sm" onclick="eliminarContacto(${
  //               contacto.codigo
  //             })">
  //             Eliminar
  //             </button>
  //           </div>
  //         </td>
  //         `;
  //
  // tbody.appendChild(tr)
};

export const cargarTabla = () => {
  const contactos = obtenerContactosDeLS();

  const tbody = document.getElementById("tbody-contactos");

  // Limpiar tabla para cargar de 0
  tbody.innerHTML = "";

  contactos.forEach((contacto, index) => {
    cargarContactoEnTabla(contacto, index, tbody);
  });
};

export const prepararEdicionContacto = (codigo) => {
  // 1. Traer la lista de contactos
  const contactos = obtenerContactosDeLS();

  // 2. Buscar el contacto a editar
  const contactoSeleccionado = contactos.find(
    (contacto) => contacto.codigo === codigo,
  );

  // 3. Seleccionar los elementos del formulario
  const campoNombre = document.getElementById("input-nombre");
  const campoNumero = document.getElementById("input-numero");
  const campoEmail = document.getElementById("input-email");
  const campoImagen = document.getElementById("input-imagen");
  const campoNotas = document.getElementById("input-notas");
  const alertEditar = document.getElementById("alert-editando");
  const spanEditar = document.getElementById("span-editando");
  const buttonCancelar = document.getElementById("button-cancelar-editar");

  // 4. Cargar los datos del contacto en el formulario
  if (contactoSeleccionado) {
    campoNombre.value = contactoSeleccionado.nombre;
    campoNumero.value = contactoSeleccionado.numero;
    campoEmail.value = contactoSeleccionado.email;
    campoImagen.value = contactoSeleccionado.imagen;
    campoNotas.value = contactoSeleccionado.notas;

    // 5. Mostrar el alert y el boton de cancelar
    alertEditar.classList.remove("d-none");
    buttonCancelar.classList.remove("d-none");
    spanEditar.innerText = contactoSeleccionado.nombre;
  }

  buttonCancelar.onclick = () => {
    cancelarEdicion();
  };

  // 6. Guardar el codigo en sessionStorage
  sessionStorage.setItem("codigoContacto", codigo);

  // 7. Llevar al usuario al formulario, arriba de la página
  window.scrollTo(0, 0);
};

export const estaEditando = () => {
  const codigoContacto = sessionStorage.getItem("codigoContacto");

  if (codigoContacto) {
    return true;
  } else {
    return false;
  }

  // Tambien se puede escribir asi (esta expresion se llama "ternaria"):
  // return codigoContacto ? true : false;

  // O así
  // return Boolean(codigoContacto);

  // O así
  // return !!codigoContacto;
};

export const cancelarEdicion = () => {
  // 1. Limpiar sessionStorage
  sessionStorage.removeItem("codigoContacto");

  // 2. Limpiar el formulario
  const campoNombre = document.getElementById("input-nombre");
  const campoNumero = document.getElementById("input-numero");
  const campoEmail = document.getElementById("input-email");
  const campoImagen = document.getElementById("input-imagen");
  const campoNotas = document.getElementById("input-notas");
  const alertEditar = document.getElementById("alert-editando");
  const spanEditar = document.getElementById("span-editando");
  const buttonCancelar = document.getElementById("button-cancelar-editar");

  campoNombre.value = "";
  campoNumero.value = "";
  campoEmail.value = "";
  campoImagen.value = "";
  campoNotas.value = "";

  // 3. Ocultar el alert y el boton, y resetear el texto del span
  alertEditar.classList.add("d-none");
  buttonCancelar.classList.add("d-none");
  spanEditar.innerText = "";
};
