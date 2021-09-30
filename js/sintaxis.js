const por100 = 100

alert ("Regla de tres simple")

let primerValor = prompt("Valor inicial de referencia (100%)")

primerValor = Number (primerValor)

let segundoValor = prompt("Valor proporcional")

segundoValor = Number (segundoValor)

let resultado = (segundoValor * por100) / primerValor;

alert ( resultado + "%");