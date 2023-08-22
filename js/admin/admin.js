'use strict';

import { obtenerContactosDeLS } from '../utils.js';
import { añadirContacto, editarContacto } from './abm.js';
import { estaEditando, recargarTabla } from './adminUtils.js';
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

const contactos = obtenerContactosDeLS();

if (contactos.length > 0) {
  recargarTabla();
}

// -----------------------------------------
// 3. Event listeners
// -----------------------------------------

// # Solo sirve para validar a medida que el usuario escribe
// # Notas no necesita, ya que es opcional

campoNombre.addEventListener('blur', (e) => {
  const value = e.target.value;

  validateName(value, campoNombre);
});

campoNumero.addEventListener('blur', (e) => {
  const value = e.target.value;

  validateNumber(value, campoNumero);
});

campoEmail.addEventListener('blur', (e) => {
  const value = e.target.value;

  validateEmail(value, campoEmail);
});

campoImagen.addEventListener('blur', (e) => {
  const value = e.target.value;

  validateImage(value, campoImagen);
});

// -----------------------------------------
// 4. Event listener del form
// -----------------------------------------

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Leemos los valores de cada campo
  const nombre = campoNombre.value;
  const numero = campoNumero.value;
  const email = campoEmail.value;
  const imagen = campoImagen.value;
  const notas = campoNotas.value;

  // La validacion que sigue permite mostrar el mensaje de error
  // en TODOS los campos, y no solo en el primero que no es valido.
  // Para eso, guardamos en un array el resultado de cada validacion
  // y luego preguntamos si todos los elementos del array son true (.every)
  const isValidArray = [
    validateName(nombre, campoNombre),
    validateNumber(numero, campoNumero),
    validateEmail(email, campoEmail),
    validateImage(imagen, campoImagen),
  ];

  // Si alguno de los campos no es valido, no se envia el formulario
  // .every evalúa si todos los elementos del array son true (Boolean, que es
  // un "atajo" para buscar los true y false)
  const isValid = isValidArray.every(Boolean);

  // Repetimos validacion por si no se produjo el blur
  if (isValid) {
    // 1. Agregar o editar el contacto
    if (estaEditando()) {
      editarContacto(nombre, numero, email, imagen, notas);
    } else {
      añadirContacto(nombre, numero, email, imagen, notas);
    }

    // 2. Recargar los datos con el nuevo contacto
    recargarTabla();

    // 3. Limpiar el formulario
    form.reset();

    // 4. Resetear las clases
    campoNombre.classList.remove('is-valid', 'is-invalid');
    campoNumero.classList.remove('is-valid', 'is-invalid');
    campoEmail.classList.remove('is-valid', 'is-invalid');
    campoImagen.classList.remove('is-valid', 'is-invalid');
  }
});
