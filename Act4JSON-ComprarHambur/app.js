/*Obtener desde el localStorage el array de objetos almacenado durante la actividad 3, con la clave ‘hamburguesas’. Recorrer el array generando un listado con el detalle de cada hamburguesa, asociando un número de selección en función de la posición.
Por último, capturar una entrada con la selección del usuario, confirmando la información del producto escogido.*/

const hamburguesa = JSON.parse(localStorage.getItem('hamburguesas'))
let combos = []
for (hambur of hamburguesa){
        
    combos += `\nHamburguesa ${hambur.combo} -> ${hambur.nombre} -> ${hambur.ingredientes} -> $${hambur.precio}`
}
console.log(`estos son los combos: ${combos}`)

let seleccion = parseInt(prompt(`Seleccione el número de producto deseado: ${combos}`))

while(isNaN(seleccion)){

    seleccion = parseInt(prompt(`Seleccione el NÚMERO de producto deseado: ${combos}`))

    console.log(seleccion)
}

let combElg = hamburguesa.find((elemento => elemento.combo === seleccion ))

console.log(combElg)

alert(`Alta burger, en 20' te la tenemos lista:\n${combElg.nombre}\n${combElg.ingredientes} \n$${combElg.precio}`)