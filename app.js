// Desafío clase 4
// >> Consigna: Con los conocimientos vistos hasta el momento, empezarás a armar la estructura inicial de tu proyecto integrador. A partir de los ejemplos mostrados la primera clase, deberás:
// Pensar el alcance de tu proyecto: ¿usarás un cotizador de seguros? ¿un simulador de créditos? ¿un simulador personalizado?
// Armar la estructura HTML del proyecto.
// Incorporar al menos un prompt para pedir un dato y luego mostrarlo mediante alert realizando alguna operación.
// Utilizar funciones para realizar esas operaciones.
// >>Aspectos a incluir en el entregable:
// Archivo HTML y Archivo JS, referenciado en el HTML por etiqueta <script src="js/miarchivo.js"></script>, que incluya la definición de un algoritmo en JavaScript que emplee funciones para resolver el procesamiento principal del simulador
// ----------------------------------------------
// Desafío adicional
// >> Consigna: codifica al menos tres funciones cuyas instrucciones permitan resolver un problema particular, segmentado en tareas. La información a procesar debe ser ingresada por el usuario, y el resultado del procesamiento visualizado en una salida.
// >>Aspectos a incluir en el entregable:
// Archivo HTML y archivo JavaScript referenciados, que incluyan la definición y llamada de al menos tres funciones.
// >>Ejemplos:
// Ejemplo de procesamiento: cálculo de IVA 
// 1) Ingresar precio de costo - 2) Sumar IVA - 3) Mostrar precio calculado.
// Ejemplo de procesamiento: determinar si un número es múltiplo 
// 1) Ingresar números a verificar - 2) ¿Es múltiplo? - 3) Mostrar resultado.

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
    console.log ("precio final= $"+total.toFixed(3)+" ==> "+cantidad+" unidad/es.")
    return total.toFixed(3)
}

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
            console.log("i toma el valor de: "+i+"\n"+"Se agrega descuento... +1 \n"+"porcentaje toma el valor de: "+sum+"%")
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
