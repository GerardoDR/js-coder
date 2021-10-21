let producto
let precio
let descuento
let impuesto = 1.21
let peso
let cantidad = 1
let mayorista
let limDesc
let total
const productos = []

//funcion que se introduce en desc()
const descMax = (min, max, percent) => percent + percent * (max - min)

//funcion que se introduce en calculo()
const tot = (precio, descuento) => (precio - (precio * (descuento / 100)))

//devuelve precio final
const calculo = (precio, descuento, impuesto, cantidad) => {
    let total = tot(precio, descuento)
    console.log("precio unitario bruto con descuento = $" + total)
    total = total * impuesto
    console.log("precio unitario con descuento e impuesto = $" + total)
    total = total * cantidad
    console.log("precio final= $" + total.toFixed(2) + " ==> " + cantidad + " unidad/es.")
    return total
}

/* Devuelve el descuento de acuerdo a:
1.la cantidad de productos;
2.el umbral a partir del que empieza a hacerse el descuento;
3.el descuento fijado por unidad que supera ese umbral; y
4.el limite de unidades que suman descuento para cada producto */

const desc = (minimo, maximo, porcentaje, cantidad) => {
    let sum = porcentaje
    for (i = minimo; i <= maximo; i++) {
        if (cantidad < minimo) {
            console.log("descuento mayorista no aplicable")
            return 0
        } else if (cantidad === i) {
            console.log("Descuento calculado: " + sum + "%")
            return porcentaje
        } else if (cantidad <= maximo) {
            sum = sum + porcentaje
            //agregar variable por afuera, que iguale a porcentaje, tomar ambas dentro de la funcion y modificar una de ellas
            console.log("i toma el valor de: " + i + "\n" + "Se agrega descuento... +" + porcentaje + "%\n porcentaje toma el valor de: " + sum + "%")
        } else {
            porcentaje = descMax(minimo, maximo, porcentaje)
            console.log("No se realizan iteraciones, salida automática." + "\n" + "porcentaje toma el valor de: " + porcentaje + "%" + "\n" + "Máximo descuento mayorista aplicado para el producto")
            return porcentaje
        }
    }

}

const stockPrecio = (producto, peso, cantidad) => {

    let precio

    let stock

    productos.forEach(element => {

        if (element.nombre === producto && element.peso === peso) {

            stock = element.verificarStock(cantidad)
            console.log(cantidad)

            if (stock === true) {

                precio = element.precio

                console.log("Stock disponible!")

            } else if (stock === false) {

                precio = false
                console.log("Stock insuficiente. Solo tenemos " + element.stock + " unidades")
                alert("Stock insuficiente. Tenemos " + element.stock + " unidades disponibles.")

            }
        }
    })

    return precio
}

//CLASS Y CREACIÓN DE OBJETOS
class Producto {

    constructor(id, nombre, peso, precio, marca, material, stock) {
        this.id = id
        this.nombre = nombre
        this.peso = peso
        this.precio = precio
        this.marca = marca
        this.material = material
        this.stock = stock

        this.verificarStock = (cantDemandada) => {
            if (this.stock >= cantDemandada) {
                // console.log("Unidades disponibles! Tenemos " + this.stock + " unidades")
                return true
            } else {
                // console.log("Stock insuficiente. Solo tenemos " + this.stock + " unidades")
                return false
            }
        }

        //método sin uso, por el momento
        this.restarStock = (cantDemandada) => {
            cantDemandada = parseInt(cantDemandada)
            if (this.stock >= cantDemandada) {
                this.stock -= cantDemandada
                console.log("Se restan " + cantDemandada + " unidades del stock. Restantes: " + this.stock)
            } else {
                alert("stock insuficiente")
            }
        }
    }
}

productos.push(new Producto(0, "barra", 15, 16000, "Rogue", "acero", 30))
productos.push(new Producto(1, "barra", 20, 19000, "Rogue", "acero", 30))
productos.push(new Producto(2, "disco", 5, 2800, "Rogue", "caucho", 60))
productos.push(new Producto(3, "disco", 10, 5800, "Rogue", "caucho", 60))
productos.push(new Producto(4, "mancuerna", 5, 1600, "Barbell", "acero", 30))
productos.push(new Producto(5, "mancuerna", 7, 2200, "Barbell", "acero", 30))
productos.push(new Producto(6, "mancuerna", 10, 3000, "Barbell", "acero", 30))
productos.push(new Producto(7, "colchoneta", 0, 3000, "MIR", "espuma alta densidad", 200))


//============================================

producto = "colchoneta"
peso = 0
cantidad = Number("")
mayorista = 5
limDesc = 9
descuento = 3
if(cantidad != ""){
    precio = stockPrecio(producto, peso, cantidad)

descuento = desc(mayorista, limDesc, descuento, cantidad)

total = calculo(precio, descuento, impuesto, cantidad)

alert("Precio de lista unitario: $" + precio + "\n\nDescuento por " + cantidad + " unidades: " + descuento + "%\n\nIVA: 21%\n\nPrecio total a pagar: $" + total.toFixed(2))
}else{
    console.log("NOPE: '"+cantidad+"'")
}
