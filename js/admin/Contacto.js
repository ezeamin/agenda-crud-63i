"use strict";

export class Contacto {
  constructor(nombre, numero, email, imagen, notas) {
    this.nombre = nombre;
    this.numero = numero;
    this.email = email;
    this.imagen = imagen;
    this.notas = notas;
    this.codigo = self.crypto.randomUUID();
  }
}
