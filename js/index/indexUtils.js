export const crearCardContacto = (contacto) => {
  const sectionContactos = document.getElementById('section-contactos');

  const div = document.createElement('div');
  const outerDiv = document.createElement('div');
  const divCardBody = document.createElement('div');

  outerDiv.classList.add('col-12', 'col-md-4', 'col-lg-3', 'p-2');

  div.classList.add('card', 'h-100', 'w-100');

  divCardBody.classList.add('card-body');

  const img = document.createElement('img');
  img.src = contacto.imagen;
  img.alt = contacto.nombre;
  img.classList.add('card-img-top');

  const h5 = document.createElement('h5');
  h5.classList.add('card-title');
  h5.innerText = contacto.nombre;

  const pNumero = document.createElement('p');
  pNumero.classList.add('card-text');
  pNumero.innerText = contacto.numero;

  const pEmail = document.createElement('p');
  pEmail.classList.add('card-text');
  pEmail.innerText = contacto.email;

  const pNotas = document.createElement('p');
  pNotas.classList.add('card-text');
  pNotas.innerText = contacto.notas;

  const aEditar = document.createElement('a');
  aEditar.classList.add('btn', 'btn-success');
  aEditar.innerText = 'Llamar';

  divCardBody.appendChild(h5);
  divCardBody.appendChild(pNumero);
  divCardBody.appendChild(pEmail);
  divCardBody.appendChild(pNotas);
  divCardBody.appendChild(aEditar);

  div.appendChild(img);
  div.appendChild(divCardBody);
  outerDiv.appendChild(div);

  sectionContactos.appendChild(outerDiv);
};
