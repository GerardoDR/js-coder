// Solicitar al usuario una (1) tecla.
// Si se presiona “y” (minúscula), o “Y” (mayúscula),
// realizar una salida por alerta con el mensaje “Correcto”. Caso contrario, la salida será “Error”.

const y = "y"

let si = prompt( "Ingrese una tecla" ).toLowerCase();

if (si === y){
    alert("Correcto")
} else {
    alert("Error")
};