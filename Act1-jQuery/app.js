// Declarar un array con nombres de ciudades, y recorrerlo. Por cada ciudad, crear un etiqueta h2 que contenga el nombre, y agregarla al body.
// Es necesario emplear selectores y el método append de jQuery

const ciudades = ['bsas','cba','mdz','tuc','sgo']

for ( e of ciudades){
    $('body').append(`<h2>${e}</h2>`)
}