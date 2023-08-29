"use strict";

export class User {
  constructor(usuario, contraseña) {
    this.usuario = usuario;
    this.contraseña = contraseña;
  }
}

// Esta clase va a servir para crear una instancia
// de usuario sin contraseña, para poder guardarla
// en el SessionStorage, sin que se vea la contraseña

// En un futuro, tendría otros datos tambien.
export class UserWithoutPassword {
  constructor(usuario) {
    this.usuario = usuario;
  }
}