// >> Consigna: Con los conocimientos vistos hasta el momento, empezarás a armar la estructura inicial de tu proyecto integrador. A partir de los ejemplos mostrados la primera clase, deberás:
// Pensar el alcance de tu proyecto: ¿usarás un cotizador de seguros? ¿un simulador de créditos? ¿un simulador personalizado?
// Armar la estructura HTML del proyecto.
// Incorporar al menos un prompt para pedir un dato y luego mostrarlo mediante alert realizando alguna operación.
// Utilizar funciones para realizar esas operaciones.
// >>Aspectos a incluir en el entregable:
// Archivo HTML y Archivo JS, referenciado en el HTML por etiqueta <script src="js/miarchivo.js"></script>, que incluya la definición de un algoritmo en JavaScript que emplee funciones para resolver el procesamiento principal del simulador
// >>Ejemplo:
// Calcular costo total de productos y/o servicios seleccionados por el usuario.
// Calcular pagos en cuotas sobre un monto determinado.
// Calcular valor final de un producto seleccionado en función de impuestos y descuentos.
// Calcular tiempo de espera promedio en relación a la cantidad de turnos registrados.
// Calcular edad promedio de personas registradas.
// Calcular nota final de alumnos ingresados.

let producto
let precio
let descuento
let impuesto = 1.21
let peso
let cantidad = 1
let mayorista
let limDesc

function calculo (precio, descuento, impuesto, cantidad) {
    let total = precio-(precio*(descuento/100))
    console.log ("precio unitario bruto con descuento = $"+total)
    total = total*impuesto
    console.log ("precio unitario con descuento e impuesto = $"+total)
    total = total*cantidad
    console.log ("precio final= $"+total+" ==> "+cantidad+" unidad/es.")
    return total
}

function desc (minimo, maximo, porcentaje, cantidad) {

    for (i = minimo; i <= maximo; i++) {
        if (cantidad < minimo) {
            console.log("descuento mayorista no aplicable")
            return 0
        } else if (cantidad == i) {
            console.log("i toma el valor de: "+i+"\n"+"porcentaje toma el valor de: "+porcentaje+"%"+"\n"+"Descuento calculado.")
            return porcentaje
        } else if (cantidad <= maximo) {
            porcentaje = porcentaje + 5
            console.log("i toma el valor de: "+i+"\n"+"porcentaje toma el valor de: "+porcentaje+"%"+"\n"+"Se aplica descuento +1...")
        } else {
            porcentaje = porcentaje+porcentaje*(maximo-minimo)
            console.log("No se realizan iteraciones, salida automática."+"\n"+"porcentaje toma el valor de: "+porcentaje+"%"+"\n"+"Máximo descuento mayorista aplicado para el producto")
            return porcentaje;
        }
    }

}

producto = prompt("Ingrese producto(barra, disco, mancuerna, colchoneta): ").toLowerCase()

console.log("producto elegido: "+producto)

cantidad = parseInt(prompt("¿Cuantas unidades?"))

switch (producto) {
    case "barra":
        precio = 10000
        //descuento que se adiciona por unidad a partir de numero de unidades mayorista y hasta cantidad limite de descuento
        descuento = 4
        //cantidad para descuento mayorista
        mayorista = 3
        //limite de descuento
        limDesc = 6
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
        descuento = 5
        mayorista = 5
        limDesc = 8
        descuento = desc(mayorista,limDesc,descuento,cantidad)
        let precioDisco = calculo(precio, descuento, impuesto, cantidad)
        alert("$"+precioDisco)
        break
    case "mancuerna":
        precio = 2000
        descuento = 5
        mayorista = 3
        limDesc = 6
        descuento = desc(mayorista,limDesc,descuento,cantidad)
        let precioMancu = calculo(precio, descuento, impuesto, cantidad)
        alert("$"+precioMancu)
        break
    case "colchoneta":
        precio = 1500
        descuento = 3
        mayorista = 5
        limDesc = 9
        descuento = desc(mayorista,limDesc,descuento,cantidad)
        let precioColcho = calculo(precio, descuento, impuesto, cantidad)
        alert("$"+precioColcho)
        break
    default:
        alert("Producto incorrecto. Por favor recargue la pagina e ingrese valor correcto")
}