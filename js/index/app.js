'use strict';

import { obtenerContactosDeLS } from '../utils.js';
import {
  cargarSelectContactos,
  crearCardContacto,
  filtrarLista,
  ordenarContactos,
} from './indexUtils.js';

// 1. Recuperar lista desde LS
const contactos = ordenarContactos(obtenerContactosDeLS());

// 2. Cargar la lista de contactos
contactos.forEach((contacto) => {
  crearCardContacto(contacto);
});

// 3. Cargar select de mensajes
contactos.forEach((contacto) => {
  cargarSelectContactos(contacto);
});

// 4. Manejar formulario de busqueda
const form = document.getElementById('form-index-contactos');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  filtrarLista();
});
