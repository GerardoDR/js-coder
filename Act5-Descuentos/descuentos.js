let cafeM = prompt ("Precio del café con medialunas")

cafeM = Number (cafeM)

let d30 = 0.3;
let d20 = 0.2;

console.log ("Precio con 30% de descuento: " + (cafeM - (cafeM*d30)) + "\n" + "Precio con 20% de descuento: " + (cafeM - (cafeM*d20)) );