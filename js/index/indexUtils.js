import { obtenerContactosDeLS } from "../utils.js";

export const ordenarContactos = (contactos) => {
  // .sort nos permite ordenar un arreglo, pero hay que
  // indicarle que ordene respecto A QUÉ. Para eso, creamos
  // una pequeña funcion que se envia como callback, que utiliza
  // un valor 'a', pos actual, y un valor 'b', siguiente elemento.
  // El tecnicismo de la funcion no es necesario aprender, pero está
  // disponible en diversos portales de internet.

  const listaOrdenada = contactos.sort((a, b) => {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    return 0;
  });

  return listaOrdenada;
};

export const crearCardContacto = (contacto) => {
  const sectionContactos = document.getElementById("section-contactos");

  // Utilizo dos divs para darle padding al de fuera (outerDiv) y separar las cards entre sí
  // El outerDiv va a tener las propiedades de col para posicionarla en la grilla

  const outerDiv = document.createElement("div");
  const div = document.createElement("div");
  const divCardBody = document.createElement("div");

  outerDiv.classList.add("col-12", "col-md-4", "col-lg-3", "p-2");
  div.classList.add("card", "h-100", "w-100");
  divCardBody.classList.add("card-body");

  const img = document.createElement("img");
  img.src = contacto.imagen;
  img.alt = contacto.nombre;
  img.classList.add("card-img-top");

  const h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.innerText = contacto.nombre;

  const pNumero = document.createElement("p");
  pNumero.classList.add("card-text");
  pNumero.innerText = contacto.telefono;

  const pEmail = document.createElement("p");
  pEmail.classList.add("card-text");
  pEmail.innerText = contacto.email;

  const pNotas = document.createElement("p");
  pNotas.classList.add("card-text");
  pNotas.innerText = contacto.notas;

  const aEditar = document.createElement("a");
  aEditar.classList.add("btn", "btn-success");
  aEditar.innerText = "Llamar";

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

export const cargarSelectContactos = (contacto) => {
  const selectContactos = document.getElementById("select-contactos");

  const option = document.createElement("option");

  // Normalmente, el value de un option sabe ser un código o identificador único

  option.innerText = contacto.nombre;
  option.value = contacto.codigo;

  selectContactos.appendChild(option);
};

export const filtrarLista = () => {
  // 1. Leemos los contactos
  const contactos = obtenerContactosDeLS();

  // 2. Recuperamos el valor del input (si no lo encuentra, utilizar un string vacio)
  const busqueda =
    document.getElementById("input-busqueda-contactos").value || "";

  // 3. Vaciamos la lista de contactos para reiniciarla
  // no es necesario crear una variable extra porque despues no lo volvemos a usar
  document.getElementById("section-contactos").innerHTML = "";

  // 4. Filtramos la lista comparando el valor del input con el nombre de c/ contacto
  const listaFiltrada = contactos.filter((contacto) =>
    contacto.nombre
      .trim()
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase()),
  );

  // 5. Volvemos a cargar la lista
  listaFiltrada.forEach((contacto) => {
    crearCardContacto(contacto);
  });
};
