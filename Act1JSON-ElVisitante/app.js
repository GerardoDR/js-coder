/*Si no existe un valor con la clave “nombre” en el localStorage, solicitar un nombre al usuario, y almacenarlo con dicha clave. Si existe, mostrar el nombre obtenido desde el storage con una alerta.*/

if(!localStorage.nombre){
    let nombre = prompt("ingrese nombre")
    localStorage.setItem("nombre", nombre)
}else{
    alert(localStorage.getItem("nombre"))
}