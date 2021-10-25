// Obtener desde el localStorage el array de objetos almacenado durante la actividad 3, con la clave ‘hamburguesas’. Recorrer el array , aumentando en un 30% el precio de cada producto. Por último, volver a almacenar el array modificado en el localStorage con la misma clave.

let hamburguesa = JSON.parse(localStorage.getItem('hamburguesas'))

for (elem of hamburguesa){
    elem.precio = elem.precio * 1.3
}

localStorage.setItem("hamburguesas", JSON.stringify(hamburguesa))

hamburguesa = JSON.parse(localStorage.getItem('hamburguesas'))

console.log(hamburguesa)
