// Sumar una propiedad “género” a la clase Actor. y modificar el formulario de alta de actores, identificando el género de cada actor creado.
// Luego, añadir una interfaz que permita seleccionar el género del actor, con la intención de filtrar el array de actores por dicho género, y actualizar la interfaz sólo con la información de los actores del género escogido.

// Es necesario emplear métodos jQuery para la solución

const actores = []
const generos = ['Drama','Erótico','Comedia','Acción','Romance']

class Actor {
    constructor(nombre,apellido,edad,genero){
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.genero = genero
    }
}

$('body').addClass('m-2')
$('select, input').addClass('my-2')

$('button').addClass('btn btn-primary my-2')

generos.forEach(( e => {
    $('#genero').append(`<option value="${e}">${e}</option>`)
}))


$('#ingreso').on('submit', (e) => {
    e.preventDefault();

    const hijos = $(e.target).children()
    actores.push(new Actor(hijos[0].value,hijos[1].value,hijos[2].value,hijos[3].value))

    $(e.target).children('input').val('')
    
    let ultActor = actores.slice(-1)
    
    $('#ultActor').html(
    `<h2 class="my-2">Último actor registrado...</h2>
        <strong>Nombre: ${ultActor[ultActor.length -1].nombre}</strong><br>
        <strong>Apellido: ${ultActor[ultActor.length -1].apellido} </strong><br>
        <small>Edad: ${ultActor[ultActor.length -1].edad}</small><br>
        <small>Genero: ${ultActor[ultActor.length -1].genero}</small>`)
})

$('body').append(
    `<div>
        <h2>Filtrar actores por genero</h2>
        <select name="filtGen" id="filtGen"></select>
        <div id="muestraFiltro"></div>
    </div>`)
for (e of generos){
    $('#filtGen').append(`<option value="${e}">${e}</option>`)
}
$('#filtGen').on('change', (e) => {
    $('#muestraFiltro').html('')
    let mostrarFiltro = actores.filter(el => el.genero == e.target.value)
    console.log(mostrarFiltro)
    mostrarFiltro.forEach(el => {
        $('#muestraFiltro').append(`
        <strong>Nombre: ${el.nombre}</strong><br>
        <strong>Apellido: ${el.apellido} </strong><br>
        <small>Edad: ${el.edad}</small><br>
        <small>Genero: ${el.genero}</small><br>`)
    })
})