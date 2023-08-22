'use strict';

import { obtenerContactosDeLS } from '../utils.js';
import { crearCardContacto } from './indexUtils.js';

// 1. Recuperar lista desde LS
const contactos = obtenerContactosDeLS();

// 2. Cargar la lista de contactos
contactos.forEach(crearCardContacto);
