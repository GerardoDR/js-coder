// Declarar un array con objetos instanciados empleando una clase Vestido. y generar un select donde los values de las etiquetas option sean los IDs asignados a cada objeto.
// Luego escuchar el evento change sobre el select, asegurando que la función manejadora dispare una salida en el HTML, especificando el elemento escogido por el usuario. Es necesario emplear selectores, y el método change de jQuery.

class Vestido{
    constructor(id, tipo, talle){
        this.id=id,
        this.tipo=tipo,
        this.talle=talle
    }
}

const vestidos = []

vestidos.push(new Vestido(0,'largo','s'))
vestidos.push(new Vestido(1,'corto','s'))
vestidos.push(new Vestido(2,'verano','s'))
vestidos.push(new Vestido(3,'floreado','s'))
vestidos.push(new Vestido(4,'formal','s'))

$('body').append('<select id="vestidos"></select>').on('change', (e) =>{
    let vestidoFiltrado = vestidos.filter( (el) => el.id == e.target.value)
    $('#muestraVest').html('')
    for (const el of vestidoFiltrado){

        $('#muestraVest').append(`
            <h2>seleccionó ${el.tipo}</h2>
            <h3>id producto: ${el.id}</h3>
        `)
    
    }
})

vestidos.forEach(e => {
    $('#vestidos').append(`
    <option value="${e.id}">Vestido ${e.tipo}</option>
    `)
})