/*Declarar un clase Hamburgesa que permita registrar nombre de la hamburguesa, el precio, los ingredientes, y el número de combo.
Luego instanciar al menos cinco (5) objetos usando esta clase, asociarlos a un array, y almacenarlos con la clave ‘hamburguesas’ en el localStorage.*/

/*Obtener desde el localStorage el array de objetos almacenado durante la actividad 3, con la clave ‘hamburguesas’. Recorrer el array generando un listado con el detalle de cada hamburguesa, asociando un número de selección en función de la posición.
Por último, capturar una entrada con la selección del usuario, confirmando la información del producto escogido.
*/
localStorage.clear()

class Hamburgesa{
    constructor(nombre, precio, ingredientes, combo){
        this.nombre=nombre
        this.precio=precio
        this.ingredientes=ingredientes
        this.combo=combo
    }
}

const hamburguesas = []

hamburguesas.push(new Hamburgesa("cheddar",500,"carne y queso",1))
hamburguesas.push(new Hamburgesa("bacon",500,"carne, queso, panceta y salsa bbq",2))
hamburguesas.push(new Hamburgesa("veggie",500,"medallon de cualquier cosa menos derivado animal y no se, falafel",3))
hamburguesas.push(new Hamburgesa("regular",500,"carne, tomate y lechuga",4))
hamburguesas.push(new Hamburgesa("blue",500,"carne y queso azul",5))

localStorage.setItem("hamburguesas", JSON.stringify(hamburguesas))