// >> Consigna: Tomando como base los ejemplos anteriores de la estructura for y while, crear un algoritmo que repita un bloque de instrucciones. En cada repetición es necesario efectuar una operación o comparación para obtener una salida por alerta o consola.
// >>Aspectos a incluir en el entregable:
// Archivo HTML y Archivo JS, referenciado en el HTML por etiqueta <script src="js/miarchivo.js"></script>, que incluya la definición de un algoritmo en JavaScript que emplee bucles e instrucciones condicionales.


// Pedir número mediante prompt y sumarle otro número en cada repetición,realizando una salida por cada resultado
// Pedir un texto mediante prompt, concatenar un valor en cada repetición, realizando una salida por cada resultado, hasta que se ingresa “ESC”.
// Pedir un número por prompt, repetir la salida del mensaje “Hola” la cantidad de veces ingresada.

//potencias

let num = parseInt(prompt("Ingresar número:"))
while (!num) {
    num = parseInt(prompt("No ha ingresado un número. Puede hacerlo a continuación: "))
}

let res = num

let potencia = parseInt(prompt("Elevado a la potencia de: "))

if (potencia === 0){
    console.log ('resultado: 1');
} else if (potencia === 1){
    console.log ('resultado: '+res);
} else if (potencia === 2){
    console.log (res);
    console.log ('resultado: '+ res*res);
} else {
    while (!potencia) {
        potencia = parseInt(prompt("No ha ingresado un número. Puede hacerlo a continuación: "))
    }

    for (i=2; i<=potencia; i++){
        res = res*num
        console.log(res)
        if (potencia == i){
            console.log('resultado: '+res)
        }
    }
}



