const por100 = 100

alert ("Regla de tres simple")

console.log ("(Valor proporcional * 100) / Valor de referencia = porcentaje de proporcion")

let primerValor = prompt("Valor de referencia (equivalente al 100%)")

primerValor = Number (primerValor)

let segundoValor = prompt("Valor proporcional")

segundoValor = Number (segundoValor)

let resultado = (segundoValor * por100) / primerValor;

alert ("el valor proporcional: '" + segundoValor + "' es el " + resultado + "%" + " del valor inicial: '" + primerValor + "'");

console.log ( "ultimo resultado: " + resultado + "%");