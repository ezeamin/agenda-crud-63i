"use strict";

import { Contacto } from './Contacto.js';
import {
  guardarContactoEnLS,
  obtenerContactosDeLS,
  recargarTabla,
} from './utils.js';
import {
  validateEmail,
  validateImage,
  validateName,
  validateNumber,
} from './validators.js';

// -----------------------------------------
// 1. Seleccion de elementos
// -----------------------------------------

const form = document.getElementById('form-contacto');
const campoNombre = document.getElementById('input-nombre');
const campoNumero = document.getElementById('input-telefono');
const campoEmail = document.getElementById('input-email');
const campoImagen = document.getElementById('input-imagen');
const campoNotas = document.getElementById('input-notas');

// -----------------------------------------
// 2. Inicializacion de contactos
// -----------------------------------------

let contactos = [];
const contactosLS = obtenerContactosDeLS();

if (contactosLS !== null) {
  contactos = contactosLS;

  recargarTabla();
}

// -----------------------------------------
// 3. Inicializacion de variables
// -----------------------------------------

let nombre = '';
let numero = '';
let email = '';
let imagen = '';
let notas = '';

// -----------------------------------------
// 4. Event listeners
// -----------------------------------------

campoNombre.addEventListener('blur', (e) => {
  const value = e.target.value;

  //   console.log(campoNombre)

  if (validateName(value, campoNombre)) {
    nombre = value;
  }
});

campoNumero.addEventListener('blur', (e) => {
  const value = e.target.value;

  if (validateNumber(value, campoNumero)) {
    numero = value;
  }
});

campoEmail.addEventListener('blur', (e) => {
  const value = e.target.value;

  if (validateEmail(value, campoEmail)) {
    email = value;
  }
});

campoImagen.addEventListener('blur', (e) => {
  const value = e.target.value;

  if (validateImage(value, campoImagen)) {
    imagen = value;
  }
});

campoNotas.addEventListener('blur', (e) => {
  const value = e.target.value;

  notas = value;
});

// -----------------------------------------
// 5. Event listener del form
// -----------------------------------------

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Repetimos validacion por si no se produjo el blur
  if (
    validateName(nombre, campoNombre) &&
    validateNumber(numero, campoNumero) &&
    validateEmail(email, campoEmail) &&
    validateImage(imagen, campoImagen)
  ) {
    // Entra SOLAMENTE si TODAS son validas
    
    // Crear el contacto
    const nuevoContacto = new Contacto(nombre, numero, email, imagen, notas);

    // Agregarlo a la lista
    guardarContactoEnLS(nuevoContacto);

    recargarTabla();

    // Limpiar el formulario
    form.reset();

    // Resetear variables
    nombre = '';
    numero = '';
    email = '';
    imagen = '';
    notas = '';

    // Mensaje de exito
    swal.fire({
      icon: 'success',
      title: 'Contacto agregado correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
