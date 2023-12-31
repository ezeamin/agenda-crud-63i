"use strict";

// Agregar más validadores acá está igual de bien que
// agregarlos en un único archivo validators.js en
// la carpeta js/

export const validateUsername = (value, campo) => {
  // Cantidad de digitos menor a 4
  if (value.trim().length < 4) {
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
    return false;
  }

  // Cantidad de digitos mayor a 20
  if (value.trim().length > 20) {
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
    return false;
  }

  campo.classList.remove("is-invalid");
  return true;
};

export const validatePassword = (value, campo) => {
  // Cantidad de digitos menor a 4
  if (value.trim().length < 4) {
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
    return false;
  }

  // Cantidad de digitos mayor a 20
  if (value.trim().length > 20) {
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
    return false;
  }

  // TODO: Agregar validacion de patrón de contraseña

  campo.classList.remove("is-invalid");
  return true;
};