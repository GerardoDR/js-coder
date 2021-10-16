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
const calculo = (precio, descuento, impuesto, cantidad) => {
    let total = tot(precio,descuento)
    console.log ("precio unitario bruto con descuento = $"+total)
    total = total*impuesto
    console.log ("precio unitario con descuento e impuesto = $"+total)
    total = total*cantidad
    console.log ("precio final= $"+total.toFixed(2)+" ==> "+cantidad+" unidad/es.")
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
            return porcentaje
        }
    }

}

const stockPrecio = (producto,cantidad) => {
    let precio = producto.precio
    producto.verificarStock(cantidad)
    return precio
}

//CLASS Y CREACIÓN DE OBJETOS
class Producto {

    constructor(id,nombre,precio,marca,material,stock){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.marca = marca
        this.material = material
        this.stock = stock
        
        this.verificarStock = (cantDemandada) => {
            if(this.stock >= cantDemandada){
                console.log("Unidades disponibles! Tenemos "+this.stock+" unidades")
                } else { 
                console.log("Stock insuficiente. Solo tenemos "+this.stock+" unidades")
                }
            }

        this.restarStock = (cantDemandada) => {
            cantDemandada = parseInt(cantDemandada)
            if(this.stock >= cantDemandada){
                this.stock -= cantDemandada
                console.log("Se restan "+cantDemandada+" unidades del stock. Restantes: "+this.stock)
            } else { 
                alert("stock insuficiente")
                }
            }
    }
}

const barra15kg = new Producto (1,"barra",16000,"Rogue","acero",30)

const barra20kg = new Producto (2,"barra",19000,"Rogue","acero",30)

const bumper5kg = new Producto (3,"disco",2800,"Rogue","caucho",60)

const bumper10kg = new Producto (4,"disco",5800,"Rogue","caucho",60)

const mancuerna5kg = new Producto (5,"mancuerna",1600,"Barbell","acero",30)

const mancuerna7kg = new Producto (6,"mancuerna",2200,"Barbell","acero",30)

const mancuerna10kg = new Producto (7,"mancuerna",3000,"Barbell","acero",30)

const colchoneta = new Producto (8,"colchoneta",3000,"MIR","espuma alta densidad",200)

//==============================

producto = prompt("Ingrese producto(barra, disco, mancuerna, colchoneta): ").toLowerCase()

console.log("producto elegido: "+producto)

cantidad = parseInt(prompt("¿Cuantas unidades?"))

console.log("unidades: "+cantidad)

switch (producto) {
    
    case "barra":
        peso = parseInt(prompt("De cuantos kg ¿15 o 20?"))
        switch (peso) {
            case 15:
                precio = stockPrecio (barra15kg,cantidad)
                break
            case 20:
                precio = stockPrecio (barra20kg,cantidad)
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
        alert("$"+precioBarra.toFixed(2))
        break

    case "disco":
        peso = parseInt(prompt("De cuantos kg ¿5 o 10?"))
        switch (peso) {
            case 5:
                precio = stockPrecio (bumper5kg,cantidad)
                break
            case 10:
                precio = stockPrecio (bumper10kg,cantidad)
                break
            default:
                alert("Solo vendemos discos de 5 o 10 kg. Por favor recargue la pagina e ingrese valor correcto")
            }
        mayorista = 5
        limDesc = 8
        descuento = 5
        descuento = desc(mayorista,limDesc,descuento,cantidad)
        let precioDisco = calculo(precio, descuento, impuesto, cantidad)
        alert("$"+precioDisco.toFixed(2))
        break

    case "mancuerna":
        peso = parseInt(prompt("De cuantos kg ¿5, 7 o 10?"))
        switch (peso) {
            case 5:
                precio = stockPrecio (mancuerna5kg,cantidad)
                break
            case 7:
                precio = stockPrecio (mancuerna7kg,cantidad)
                break
            case 10:
                precio = stockPrecio (mancuerna10kg,cantidad)
                break
            default:
                alert("Solo vendemos mancuernas de 5, 7 o 10 kg. Por favor recargue la pagina e ingrese valor correcto")
            }
        mayorista = 3
        limDesc = 6
        descuento = 4
        descuento = desc(mayorista,limDesc,descuento,cantidad)
        let precioMancu = calculo(precio, descuento, impuesto, cantidad)
        alert("$"+precioMancu.toFixed(2))
        break

    case "colchoneta":
        precio = stockPrecio (colchoneta,cantidad)
        mayorista = 5
        limDesc = 9
        descuento = 3
        descuento = desc(mayorista,limDesc,descuento,cantidad)
        let precioColcho = calculo(precio, descuento, impuesto, cantidad)
        alert("$"+precioColcho.toFixed(2))
        break

    default:
        alert("Producto incorrecto. Por favor recargue la pagina e ingrese valor correcto")
}
