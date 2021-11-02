/////////////////////////////////VARIABLES

let producto;
let peso;
let cantidad;
const productos = [];
const carrito = [];

/////////////////////////////////CLASS Y CREACIÓN DE OBJETOS
class Producto {

    constructor(id, nombre, peso, precio, marca, material, stock,img) {
            this.id = id,
            this.nombre = nombre,
            this.peso = peso,
            this.precio = precio,
            this.marca = marca,
            this.material = material,
            this.stock = stock,
            this.img = img
    }
    verificarStock = (cantDemandada) => {
        if (this.stock >= cantDemandada) {
            return true;
        } else {
            return false;
        }
    }

    restarStock = (cantDemandada) => {
        cantDemandada = parseInt(cantDemandada);
        if (this.stock >= cantDemandada) {
            this.stock -= cantDemandada;
        } else {
            alert("stock insuficiente");
        }
    }
}

productos.push(new Producto(0, "barra", 15, 16000, "Quuz", "acero", 30,'barra.jpg'));
productos.push(new Producto(1, "barra", 20, 19000, "Quuz", "acero", 30,'barra.jpg'));
productos.push(new Producto(2, "disco", 5, 2800, "Quuz", "caucho", 60,'disco.jpg'));
productos.push(new Producto(3, "disco", 10, 5800, "Quuz", "caucho", 60,'disco.jpg'));
productos.push(new Producto(4, "mancuerna", 5, 1600, "Quuz", "acero", 30,'mancuerna.jpg'));
productos.push(new Producto(5, "mancuerna", 7, 2200, "Quuz", "acero", 30, 'mancuerna.jpg'));
productos.push(new Producto(6, "mancuerna", 10, 3000, "Quuz", "acero", 30, 'mancuerna.jpg'));


/////////////////////////////////

const qProd = document.querySelectorAll('.qProd');
const prodMain = document.querySelector('.prodMain');
const home = document.querySelector('.home');
const contCarrito = document.querySelector('.contCarrito')
const cantidadEnCarrito = document.querySelector('.cantidadEnCarrito')
const total = document.querySelector('.total')
const botonVaciar = document.querySelector('.botonVaciar')


const filtro = (arr,nombre) => {
    const filtrado = arr.filter((prod) => prod.nombre === nombre);
    return filtrado;
}

const listarProductos = (arrayFiltrado) => {
    prodMain.innerHTML="";
    arrayFiltrado.forEach((e) => {
        const creaDiv = document.createElement('div');
        creaDiv.classList.add('prodMain__elemento', 'col', 'mb-5');
        creaDiv.innerHTML= 
        `<div class="card h-100">
                <!-- <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div> -->
                <img class="card-img-top" src="/assets/${e.img}" alt="${e.nombre}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder caps">${e.nombre} ${e.peso} kg</h5>
                        <span>$${e.precio}</span>
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a id="${e.id}" class="btn btn-outline-dark mt-auto">Agregar al carrito</a></div>
                </div>
            </div>
        </div>
        `;
        
        prodMain.append(creaDiv);

        const botonAgregar = document.getElementById(e.id);

        botonAgregar.addEventListener('click', (ev) => {
            agregarAlCarrito(e.id)
        });

        

    })
}

//LLAMADO INICIAL DE LISTAR PRODUCTOS
listarProductos(productos);



qProd.forEach((e) => e.addEventListener('click', (event) => {
    event.preventDefault();
    if (e.className.includes('barra')){
        const filtrado = filtro(productos,'barra');
        console.log(filtrado)
        const div = listarProductos(filtrado);
    }else if(e.className.includes('disco')){
        const filtrado = filtro(productos,'disco');
        const div = listarProductos(filtrado);
    }else if(e.className.includes('mancuerna')){
        const filtrado = filtro(productos,'mancuerna');
        const div = listarProductos(filtrado);
    }else{
        prodMain.innerHTML="";
        const div = document.createElement('div');
        div.classList.add('prodMain__elemento', 'col', 'mb-2');
        div.id = 'proximamente';
        div.innerHTML= "<h5>Proximamente</h5>";
        prodMain.append(div);
    };
}));

const actualizarCarrito = () => {
    contCarrito.innerHTML = ""
    carrito.forEach((prod) => {
    const li = document.createElement('li')
    li.className = "d-flex flex-row justify-content-between"
    li.innerHTML = `
    <h5 class="fw-bolder caps">${prod.nombre} ${prod.peso} kg</h5>
    <span>Precio: $${prod.precio}</span>
    <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar">borrar</button>
    `
    contCarrito.append(li)
    })
    console.log(carrito)
    cantidadEnCarrito.innerText = carrito.length
    const pTotal= carrito.reduce((acc, carr) => acc + carr.precio,0)
    total.innerText = `$${pTotal}`
}

const agregarAlCarrito = (id) => {
    const prod = productos.find( (prod) => prod.id === id)
    carrito.push(prod)
    actualizarCarrito()
};

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    contCarrito.innerHTML = `<h5>Carrito vacío</h5>`
})