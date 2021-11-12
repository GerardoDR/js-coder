// Declarar un array con nombres de canales, y generar un select donde los values de las etiquetas option sean la posición del canal en la colección.
// Luego, escuchar el evento change sobre el select, asegurando que la función manejadora dispare una salida en el HTML , especificando el canal seleccionado.
// Es necesario emplear métodos jQuery para asegurar que el select ingresado sea el primer hijo del body.

const canales = ['canal1','canal2','canal3','canal4','canal5','canal6',]
$('body').prepend(`
<select name="canales" id="canales"></select>`)

canales.forEach((e,i) => {
    $('#canales').append(`<option value="${i}">${e}</option>`)
});

$('#canales').on('change', (e) => {
    $('#change').html('')
    $('#change').append(`<h1>${canales[e.target.value]}</h1>`)
})
