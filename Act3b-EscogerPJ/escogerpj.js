// Solicitar al usuario un (1) un número.
// Si el valor está entre 1 y 4, efectuar una de las siguientes salidas según corresponda: 
// “Elegiste a Homero” si es 1.
// “Elegiste a Marge” si es 2.
// “Elegiste a Bart” si es 3.
// “Elegiste a Lisa” si es 4.

let num = parseInt(prompt("Ingrese número entre 1 y 4"))

if (num >= 1 && num <=4){
  if (num === 1){
        alert('Elegiste a Homero')
    } else if (num === 2) { 
        alert('Elegiste a Marge')
    } else if(num === 3) { 
        alert('Elegiste a Bart')
    } else { 
        alert ('elegiste a Lisa')
    }
} else {
    alert('No elegiste un número dentro del rango')
}