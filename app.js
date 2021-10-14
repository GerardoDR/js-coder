let producto
let precio
let descuento
let impuesto = 1.21
let peso
let cantidad = 1
let mayorista
let limDesc

//funcion que se introduce en desc()
const descMax = (min, max, percent) => percent+percent*(max-min)

//funcion que se introduce en calculo()
const tot = (precio,descuento) => (precio-(precio*(descuento/100)))

//devuelve precio final
function calculo (precio, descuento, impuesto, cantidad) {
    let total = tot(precio,descuento)
    console.log ("precio unitario bruto con descuento = $"+total)
    total = total*impuesto
    console.log ("precio unitario con descuento e impuesto = $"+total)
    total = total*cantidad
    console.log ("precio final= $"+total.toFixed(3)+" ==> "+cantidad+" unidad/es.")
    return total.toFixed(3)
}

/* Devuelve el descuento de acuerdo a:
1.la cantidad de productos;
2.el umbral a partir del que empieza a hacerse el descuento;
3.el descuento fijado por unidad que supera ese umbral; y
4.el limite de unidades que suman descuento para cada producto */

function desc (minimo, maximo, porcentaje, cantidad) {
    let sum = porcentaje
    for (i = minimo; i <= maximo; i++) {
        if (cantidad < minimo) {
            console.log("descuento mayorista no aplicable")
            return 0
        } else if (cantidad == i) {
            console.log("Descuento calculado: "+sum+"%")
            return porcentaje
        } else if (cantidad <= maximo) {
            sum = sum + porcentaje
            //agregar variable por afuera, que iguale a porcentaje, tomar ambas dentro de la funcion y modificar una de ellas
            console.log("i toma el valor de: "+i+"\n"+"Se agrega descuento... +"+ porcentaje + "%\n porcentaje toma el valor de: "+sum+"%")
        } else {
            porcentaje = descMax (minimo,maximo,porcentaje)
            console.log("No se realizan iteraciones, salida automática."+"\n"+"porcentaje toma el valor de: "+porcentaje+"%"+"\n"+"Máximo descuento mayorista aplicado para el producto")
            return porcentaje;
        }
    }

}

class Producto {

    constructor(nombre,marca,peso,stock){
        this.nombre = nombre
        this.marca = marca
        this.peso = peso
        this.stock = stock
    }

    restarStock(cantDemandada){
        if(this.stock >= cantDemandada){
            this.stock = this.stock-cantDemandada
        } else { alert("stock insuficiente")}
    }


}

producto = prompt("Ingrese producto(barra, disco, mancuerna, colchoneta): ").toLowerCase()

console.log("producto elegido: "+producto)

cantidad = parseInt(prompt("¿Cuantas unidades?"))

console.log("unidades: "+cantidad)

switch (producto) {
    case "barra":
        peso = parseInt(prompt("De cuantos kg ¿15 o 20?"))
        switch (peso) {
            case 15:
                precio = 10000
                break
            case 20:
                precio = 14000
                break
            default:
                alert("Solo vendemos barras de 15 o 20 kg. Por favor recargue la pagina e ingrese valor correcto")
            }
        //cantidad para descuento mayorista
        mayorista = 3
        //limite de descuento
        limDesc = 6
        //descuento por unidad adicional por encima de cantidad mayorista
        descuento = 4
        //funcion descuento
        descuento = desc(mayorista,limDesc,descuento,cantidad)
        //funcion calculo de precio final
        let precioBarra = calculo(precio, descuento, impuesto, cantidad)
        alert("$"+precioBarra)
        break
    case "disco":
        peso = parseInt(prompt("De cuantos kg ¿5 o 10?"))
        switch (peso) {
            case 5:
                precio = 1200
                break
            case 10:
                precio = 2100
                break
            default:
                alert("Solo vendemos discos de 5 o 10 kg. Por favor recargue la pagina e ingrese valor correcto")
            }
        mayorista = 5
        limDesc = 8
        descuento = 5
        descuento = desc(mayorista,limDesc,descuento,cantidad)
        let precioDisco = calculo(precio, descuento, impuesto, cantidad)
        alert("$"+precioDisco)
        break
    case "mancuerna":
        peso = parseInt(prompt("De cuantos kg ¿5, 7 o 10?"))
        switch (peso) {
            case 5:
                precio = 1700
                break
            case 7:
                precio = 2200
                break
            case 10:
                precio = 2500
                break
            default:
                alert("Solo vendemos mancuernas de 5, 7 o 10 kg. Por favor recargue la pagina e ingrese valor correcto")
            }
        mayorista = 3
        limDesc = 6
        descuento = 4
        descuento = desc(mayorista,limDesc,descuento,cantidad)
        let precioMancu = calculo(precio, descuento, impuesto, cantidad)
        alert("$"+precioMancu)
        break
    case "colchoneta":
        precio = 1500
        mayorista = 5
        limDesc = 9
        descuento = 3
        descuento = desc(mayorista,limDesc,descuento,cantidad)
        let precioColcho = calculo(precio, descuento, impuesto, cantidad)
        alert("$"+precioColcho)
        break
    default:
        alert("Producto incorrecto. Por favor recargue la pagina e ingrese valor correcto")
}
