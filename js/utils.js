export const obtenerContactosDeLS = () => {
  const contactosLS = JSON.parse(localStorage.getItem("contactos"));

  if (contactosLS) {
    return contactosLS;
  } else {
    return [];
  }

  // Tambien se puede escribir asi (esta expresion se llama "ternaria"):
  // return contactosLS ? contactosLS : [];

  // O así (expresion logica)
  // return contactosLS || [];
};
