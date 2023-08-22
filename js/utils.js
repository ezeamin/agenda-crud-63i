"use strict";

export const obtenerContactosDeLS = () => {
  const contactosLS = JSON.parse(localStorage.getItem('contactos'));

  if (contactosLS) {
    return contactosLS;
  } else {
    return [];
  }
};

export const guardarContactoEnLS = (contacto) => {
  const contactos = obtenerContactosDeLS();

  contactos.push(contacto);

  localStorage.setItem('contactos', JSON.stringify(contactos));
};

export const cargarContactoEnTabla = (contacto, index, tbody) => {
  const tr = document.createElement('tr');

  // INDICE ------------------------------------------------------

  const tdIndex = document.createElement('td');
  tdIndex.textContent = index + 1;
  tr.appendChild(tdIndex);

  // IMAGEN ------------------------------------------------------

  const tdImagen = document.createElement('td');
  const imagen = document.createElement('img');
  imagen.src = contacto.imagen;
  imagen.alt = contacto.nombre;
  imagen.classList.add('imagen-contacto');
  tdImagen.appendChild(imagen);
  tr.appendChild(tdImagen);

  // NOMBRE ------------------------------------------------------

  const tdNombre = document.createElement('td');
  tdNombre.textContent = contacto.nombre;
  tr.appendChild(tdNombre);

  // NUMERO ------------------------------------------------------

  const tdNumero = document.createElement('td');
  tdNumero.textContent = contacto.numero;
  tr.appendChild(tdNumero);

  // EMAIL ------------------------------------------------------

  const tdEmail = document.createElement('td');
  tdEmail.textContent = contacto.email;
  tr.appendChild(tdEmail);

  // NOTAS ------------------------------------------------------

  const tdNotas = document.createElement('td');
  tdNotas.textContent = contacto.notas;
  tr.appendChild(tdNotas);

  // ACCIONES ------------------------------------------------------

  const tdAcciones = document.createElement('td');
  const divAcciones = document.createElement('div');
  divAcciones.classList.add(
    'd-flex',
    'flex-column',
    'flex-md-row',
    'justify-content-end',
    'gap-2',
    'h-100'
  );

  const botonEditar = document.createElement('button');
  botonEditar.classList.add('btn', 'btn-warning', 'btn-sm');
  botonEditar.textContent = 'Editar';
  botonEditar.onclick = () => {
    console.log('Editar contacto', contacto.codigo);
    // editarContacto(contacto.codigo);
  };
  divAcciones.appendChild(botonEditar);

  const botonEliminar = document.createElement('button');
  botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.onclick = () => {
    console.log('Eliminar contacto', contacto.codigo);
    // eliminarContacto(contacto.codigo);
  };
  divAcciones.appendChild(botonEliminar);

  tdAcciones.appendChild(divAcciones);
  tr.appendChild(tdAcciones);

  tbody.appendChild(tr);

  // OTRA MANERA - NO RECOMENDABLE
  //   tr.innerHTML = `
  //         <td>${index + 1}</td>
  //         <td><img src=${contacto.imagen} alt=${
  //     contacto.nombre
  //   } class="imagen-contacto"/></td>
  //         <td>${contacto.nombre}</td>
  //         <td>${contacto.numero}</td>
  //         <td>${contacto.email}</td>
  //         <td>${contacto.notas}</td>
  //         <td>
  //             <button class="btn btn-danger btn-sm" onclick="eliminarContacto(${
  //               contacto.codigo
  //             })">
  //             Eliminar
  //             </button>
  //         </td>
  //         `;
  //
  // tbody.appendChild(tr)
};

export const recargarTabla = () => {
  const contactos = obtenerContactosDeLS();

  const tbody = document.getElementById('tbody-contactos');

  // Limpiar tabla para cargar de 0
  tbody.innerHTML = '';

  contactos.forEach((contacto, index) => {
    cargarContactoEnTabla(contacto, index, tbody);
  });
};
