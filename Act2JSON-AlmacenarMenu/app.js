/*Si no existe un valor con la clave “comidas” en el localStorage, crear un array vacío y cargarlo de forma dinámica, solicitando al usuario nombres de comida de forma consecutiva,  hasta cinco (5) veces. Luego almacenarlo con dicha clave. Si existe, recorrer el array, e informar por alerta el menú cargado.*/

if(localStorage.getItem("comidas") == null){

    let arrComidas = []

    for(let i=1;i<=5;i++){

        arrComidas[i] = prompt("Comida n°"+i+" para el menú: ")
    }
    localStorage.setItem("comidas", arrComidas)

} else {

    alert( localStorage.getItem("comidas"))

    // for (let comida of localStorage.getItem("comidas")) {

    //     console.log("Producto: " + comida)

    // }
}