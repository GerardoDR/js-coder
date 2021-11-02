/////////////////////////////////////////////MODAL
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')

const botonVaciar = document.getElementById('vaciar-carrito')

const carrito = []



botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('visible')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('invisible')
})

contenedorModal.addEventListener('click', () => {
    botonCerrar.click()
})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})
/////////////////////////////////

const agregarAlCarrito = (prodId) => {
    const item = productos.find( (prod) => prod.id === prodId)
    carrito.push(item)

    actualizarCarrito()
    console.log(carrito)
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find( (prod) => prod.id === prodId )
    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1)

    actualizarCarrito()
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach( (prod) => {
        const div = document.createElement('div')
        div.className = "productoEnCarrito"
        div.innerHTML = `
                    <p>${prod.nombre}</p>
                    <p>Precio: $${prod.precio}</p>
                    <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
                `
        contenedorCarrito.appendChild(div)
    })

    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}