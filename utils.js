
//segunda opcion recomendada actualmente
//crear un require con ES6 Modules
import { createRequire } from 'node:module'; //se importa createRequire de node:module
const require = createRequire(import.meta.url); // se crea un require con createRequire y con import.meta.url le pasamos la direccion del archivo actual o en el que estamos

export const readJSON = (path)=> require(path); //con el nuevo require creado podemos indicarle la ruta donde se encuentra a partir de este archivo
//LA VENTAJA DE USAR ESTA OPCION Y DE CREAR TUS PROPIO REQUIRE EN ESTE CASO ESPECIFICO ES QUE PERMITE OBTENER UN ARCHIVO JSON SIN NECEDIDAD DE PARSEARLO 
// COMO LO HACIA EL REQUIRE EN COMMONJS Y ASI EVITAMOS BUSCAR EL ARCHIVO CON FILESYSTEM Y LUEGO PARSEARLO COMO EN LA PRIMERA OPCION
