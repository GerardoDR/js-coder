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
    $('#placeholders').hide()
    setTimeout((e) => {
        $('body').toggleClass('hola');
        $('#imagen button').show()
        $('#placeholders').show()
    }, 30);
})

// fetch('https://jsonplaceholder.typicode.com/posts/3')
// .then((response) => response.json())
// .then((json) => $('#placeholders').append((json)));

$('#placeholders').animate({
    //valores de destino
    'width': '1px',
    'height': '1px',
    'border-radius': '50%'
}, 2000, () => {
    $('#placeholders').animate({
        'display': 'none'
    },0, () => {
        $('#placeholders').text('prueba animaciones anidadas')
        $('#placeholders').animate({
            'width': '500px',
            'height': '50px',
            'border-radius': '5px',
        },500)
        $('#placeholders').css('background-color', 'rgb(43, 231, 43)')
    })
})