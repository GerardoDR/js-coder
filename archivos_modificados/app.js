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

const desc = (cantidad) => {
    if(cantidad >= 5 && cantidad < 10){
        console.log('Se aplica 5% de descuento')
        return 5
    }else if(cantidad >= 10){
        console.log('Se aplica 10% de descuento')
        return 10
    }else{
        console.log("descuento mayorista no aplicable")
        return 0
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
    }
    verificarStock = (cantDemandada) => {
        if (this.stock >= cantDemandada) {
            // console.log("Unidades disponibles! Tenemos " + this.stock + " unidades")
            return true
        } else {
            // console.log("Stock insuficiente. Solo tenemos " + this.stock + " unidades")
            return false
        }
    }

    //método sin uso, por el momento
    restarStock = (cantDemandada) => {
        cantDemandada = parseInt(cantDemandada)
        if (this.stock >= cantDemandada) {
            this.stock -= cantDemandada
            console.log("Se restan " + cantDemandada + " unidades del stock. Restantes: " + this.stock)
        } else {
            alert("stock insuficiente")
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

localStorage.setItem("productos", JSON.stringify(productos))


//==============================

do {
    producto = prompt("Ingrese producto(barra, disco, mancuerna, colchoneta): ").toLowerCase()
    console.log("producto elegido: " + producto)

    switch (producto) {

        case "barra":
            peso = parseInt(prompt("De cuantos kg ¿15 o 20?"))
            if (peso === 15 || peso === 20) {
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

descuento = desc(cantidad)

total = calculo(precio, descuento, impuesto, cantidad)

alert("Precio de lista por unidad: $" + precio + "\n\nDescuento por " + cantidad + " unidades: " + descuento + "%\n\nIVA: 21%\n\nPrecio total a pagar: $" + total.toFixed(2))


/////////////////////////////////////////////////////////////////

