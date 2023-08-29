"use strict";

import { obtenerContactosDeLS } from "../utils.js";
import {
  cargarSelectContactos,
  crearCardContacto,
  filtrarLista,
  ordenarContactos,
} from "./indexUtils.js";

// -----------------------------------------
// 1. Recuperar lista desde LS
// -----------------------------------------

// # El arreglo que viene de LS debe ser ordenado en orden alfabético

const contactos = ordenarContactos(obtenerContactosDeLS());

// -----------------------------------------
// 2. Cargar lista de contactos
// -----------------------------------------

contactos.forEach((contacto) => {
  crearCardContacto(contacto);
});

// -----------------------------------------
// 3. Cargar select de mensajes
// -----------------------------------------

contactos.forEach((contacto) => {
  cargarSelectContactos(contacto);
});

// -----------------------------------------
// 4. Seleccionar elementos
// -----------------------------------------

const formContactos = document.getElementById("form-index-contactos");

// -----------------------------------------
// 5. Manejar formulario de busqueda
// -----------------------------------------

formContactos.addEventListener("submit", (e) => {
  e.preventDefault();

  filtrarLista();
});
