// Solicitar al usuario un (1) número.
// Si el valor está entre dos números, efectuar una de las siguientes salidas, según corresponda: 
// “Presupuesto bajo” si está entre 0 y 1000.
// “Presupuesto medio” si está entre 1001 y 3000.
// “Presupuesto alto” si es  mayor que 3000.

let num = parseFloat(prompt("Ingrese presupuesto"));

if ( num >= 0 && num <= 1000){
    alert("Presupuesto bajo")
} else if ( num >= 1001 && num <= 3000){
    alert("Presupuesto medio")
} else if ( num > 3000){
    alert("Presupuesto alto")
} else {
    alert("Numero no contemplado")
}
