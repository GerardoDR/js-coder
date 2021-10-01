// >> Consigna: Crea un algoritmo que solicite al usuario uno o más valores ingresados por prompt(), compare las entradas y,
//  en función de ciertas condiciones, muestre por consola o alert() el resultado según los valores ingresados y las condiciones cumplidas.
// >>Aspectos a incluir en el entregable:
// Archivo HTML y Archivo JS, referenciado en el HTML por etiqueta <script src="js/miarchivo.js"></script>, que incluya la definición de un algoritmo en JavaScript que emplee instrucciones condicionales.
// >>Ejemplo:
// Pedir número mediante prompt y si es mayor a 1000 mostrar un alert.
// Pedir un texto mediante prompt, y si es igual a "Hola" mostrar un alerta por consola.
// Pedir un número por prompt y evaluar si está entre 10 y 50. En caso positivo mostrar un alert.

const hola = "Hola"
let num = parseFloat(prompt("Ingrese un número"))

if (num > 1000){
    alert("ding!ding!ding!")
}

let text = prompt("Ahora salude!")

if (text === hola){
    alert("ding!ding!ding!")
}

let num2 = parseFloat(prompt("Elija otro numero"))

if (num2 >= 10 && num2 <= 50){
    alert("ding!ding!ding!")
}