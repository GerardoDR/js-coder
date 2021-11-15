$(document).ready(() => {
    $('#pregunta input').focus()
})

$('#pregunta').append(
    `<h2>¿Cuál es tu nombre?</h2>
    <input type="text" placeholder="tu respuesta"></input>`
)
$('#pregunta input').on('change', (e) => {
    $('#respuesta').html('')
    $('#respuesta').append(`
    <h3 class="caps">¿¿${e.target.value}??</h3><h3>que lindo nombre... ponele</h3>
    `).hide().fadeIn()
    $('#pregunta input').val('')
})

$('#imagen').append(`<button>No pases por acá</button>`);
$('#imagen button').on('mouseover', () => {
    $('body').toggleClass('hola');
    $('#imagen button').hide()
    setTimeout( (e) => {
        $('body').toggleClass('hola');
        $('#imagen button').show()
    }, 30);
})