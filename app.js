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

/* Producto ingresa en el "do", luego se ingresa por prompt el peso, si corresponde para el producto, y se modifican las variables para la función desc()
Luego de eso, se ingresa por prompt la cantidad, que es parseada a entero. Estos 3 parámetros ingresan a la siguiente función:
1. Primero se depura el ingreso de cantidad, para evitar que se permita el ingreso de "".
2. Si se ingresa un valor aceptable de cantidad, se recorre el array buscando un producto y peso que coincidan con los ingresados.
    Cuando se encuentra, se ingresa cantidad al método this.verificarStock que devuelve "true" si el stock del producto es >= a cantidad y false si es < y asigna el booleano a la variable "stock"
3. se evalúa el contenido de "stock", y en caso de true, la variable "precio" toma el valor de "this.precio", caso contrario toma el valor de falso
4. Si cantidad, al principio era "NaN", la función no recorrió el array, y por el else de este condicional se le asigna el valor false a "precio".
5. la función retorna el valor de precio */

const stockPrecio = (producto, peso, cantidad) => {
    let precio
    let stock
    if (!isNaN(cantidad)) {
        productos.forEach(element => {
            if (element.nombre === producto && element.peso === peso) {
                stock = element.verificarStock(cantidad)
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
    } else {
        alert("Ingreso de cantidad erroneo. Por favor, ingrese los detalles nuevamente.")
        console.log("Valor de cantidad: " + cantidad + ". Ingreso erroneo")
        precio = false
    }
    return precio
}

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


//==============================

do {
    producto = prompt("Ingrese producto(barra, disco, mancuerna, colchoneta): ").toLowerCase()
    console.log("producto elegido: " + producto)

    switch (producto) {

        case "barra":
            peso = parseInt(prompt("De cuantos kg ¿15 o 20?"))
            if (peso === 15 || peso === 20) {
                //cantidad para descuento mayorista
                mayorista = 3
                //limite de descuento
                limDesc = 6
                //descuento por unidad adicional por encima de cantidad mayorista
                descuento = 4

                cantidad = parseInt(prompt("¿Cuantas unidades?"))
                console.log("unidades: " + cantidad)
                precio = stockPrecio(producto, peso, cantidad)
            } else {
                peso = false
                alert("Solo vendemos barras de 15 o 20 kg. Por favor recargue la pagina e ingrese valor correcto")
            }
            break

        case "disco":
            peso = parseInt(prompt("De cuantos kg ¿5 o 10?"))
            if (peso === 5 || peso === 10) {
                mayorista = 5
                limDesc = 8
                descuento = 5

                cantidad = parseInt(prompt("¿Cuantas unidades?"))
                console.log("unidades: " + cantidad)
                precio = stockPrecio(producto, peso, cantidad)
            } else {
                peso = false
                alert("Solo vendemos discos de 5 o 10 kg. Por favor recargue la pagina e ingrese valor correcto")
            }
            break

        case "mancuerna":
            peso = parseInt(prompt("De cuantos kg ¿5, 7 o 10?"))
            if (peso === 5 || peso === 7 || peso === 10) {
                mayorista = 3
                limDesc = 6
                descuento = 4

                cantidad = parseInt(prompt("¿Cuantas unidades?"))
                console.log("unidades: " + cantidad)
                precio = stockPrecio(producto, peso, cantidad)
            } else {
                peso = false
                alert("Solo vendemos mancuernas de 5, 7 o 10 kg. Por favor recargue la pagina e ingrese valor correcto")
            }
            break

        case "colchoneta":
            peso = 0
            mayorista = 5
            limDesc = 9
            descuento = 3

            cantidad = parseInt(prompt("¿Cuantas unidades?"))
            console.log("unidades: " + cantidad)
            precio = stockPrecio(producto, peso, cantidad)
            break

        default:
            producto = false
            alert("Producto incorrecto. Solo disponemos de las siguientes categorías de productos: \n barra\n disco\n mancuerna\n colchoneta\n Por favor, ingrese alguno de los valores anterior para continuar.")
    }

console.log("ERROR CHECK: "+producto+ ", "+peso+", "+precio)

} while (producto === false || peso === false || precio === false)

descuento = desc(mayorista, limDesc, descuento, cantidad)

total = calculo(precio, descuento, impuesto, cantidad)

alert("Precio de lista por unidad: $" + precio + "\n\nDescuento por " + cantidad + " unidades: " + descuento + "%\n\nIVA: 21%\n\nPrecio total a pagar: $" + total.toFixed(2))


/////////////////////////////////////////////////////////////////

