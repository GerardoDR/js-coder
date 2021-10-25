/*Declarar un array con nombres de ciudades y recorrerlo. Por cada ciudad, crear un etiqueta h2 que contenga el nombre, y agregarla al body.*/

const ciudades = ['Buenos Aires','Córdoba','San Juán','Entre ríos','Misiones','Salta','Tierra del Fuego']

const body = document.querySelector('body')

for (elem of ciudades){
    const h2 = document.createElement('h2')
    h2.innerHTML = `<h2>${elem}</h2>`
    body.appendChild(h2)
}