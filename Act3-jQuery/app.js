// Crear un formulario que permita ingresar la información de actores. Luego, escuchar el evento submit sobre el form, capturando las entradas, invocar un objeto Actor usando los valores ingresados, y asociar la instancia a un array de actores.
// Por último, disparar una salida en el HTML , a modo de confirmación de los datos registrados.
// Es necesario emplear métodos jQuery para la solución.
const actores = []
class Actor {
    constructor(nombre,apellido,edad,especialidad){
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.especialidad = especialidad
    }
}
$('input').addClass('m-2')
$('button').addClass('btn btn-primary m-2')

$('#ingreso').on('submit', (e) => {
    e.preventDefault();
    const hijos = $(e.target).children()
    actores.push(new Actor(hijos[0].value,hijos[1].value,hijos[2].value,hijos[3].value))
    console.log(actores)
    $(e.target).children('input').val('')
    let ultActor = actores.slice(-1)
    console.log (ultActor[ultActor.length -1].nombre)
    $('#ultActor').html(
        `<h2 class="my-2">Último actor registrado...</h2>
        <strong>Nombre: ${ultActor[ultActor.length -1].nombre}</strong><br>
        <strong>Apellido: ${ultActor[ultActor.length -1].apellido} </strong><br>
        <small>Edad: ${ultActor[ultActor.length -1].edad}</small><br>
        <small>Especialidad: ${ultActor[ultActor.length -1].especialidad}</small>`)
})
