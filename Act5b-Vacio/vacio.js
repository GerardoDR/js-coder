// Solicitar al usuario cuatro (4) productos de almacén.
// Si todos los elementos fueron cargados, realizar una única salida compuesta por el listado de productos. 
// Caso contrario, la salida será “Error: Es necesario cargar todos los productos”.

let prod1 = prompt('Ingrese producto1');
let prod2 = prompt('Ingrese producto2');
let prod3 = prompt('Ingrese producto3');
let prod4 = prompt('Ingrese producto4');

if (prod1 != "" && prod2 != "" && prod3 != "" && prod4 != ""){
    alert(prod1+'\n'+ prod2+'\n'+ prod3+'\n'+ prod4)
} else {
    alert('Error: Es necesario cargar todos los productos')
}

//DUDA: COLOCAR !false EN LUGAR DE !="" O !=null ARROJA ERROR