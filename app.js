/////////////////////////////////VARIABLES

let producto;
let peso;
let cantidad;
const productos = [];
const carrito = [];

/////////////////////////////////CLASS Y CREACIÓN DE OBJETOS
class Producto {

    constructor(id, nombre, peso, precio, marca, material, stock, img) {
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

productos.push(new Producto(0, "barra", 15, 16000, "Quuz", "acero", 30, 'barra.jpg'));
productos.push(new Producto(1, "barra", 20, 19000, "Quuz", "acero", 30, 'barra.jpg'));
productos.push(new Producto(2, "disco", 5, 2800, "Quuz", "caucho", 60, 'disco.jpg'));
productos.push(new Producto(3, "disco", 10, 5800, "Quuz", "caucho", 60, 'disco.jpg'));
productos.push(new Producto(4, "mancuerna", 5, 1600, "Quuz", "acero", 30, 'mancuerna.jpg'));
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


const filtro = (arr, nombre) => {
    const filtrado = arr.filter((prod) => prod.nombre === nombre);
    return filtrado;
}

const listarProductos = (arrayFiltrado) => {
    prodMain.innerHTML = "";
    arrayFiltrado.forEach((e) => {
        const creaDiv = document.createElement('div');
        creaDiv.classList.add('prodMain__elemento', 'col', 'mb-5');
        creaDiv.innerHTML =
            `<div class="card h-100">
                <img class="card-img-top" src="/assets/${e.img}" alt="${e.nombre}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder caps">${e.nombre} ${e.peso} kg</h5>
                        <span>$${e.precio}</span>
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center"><a id="prod${e.id}" class="btn btn-outline-dark mt-auto">Agregar al carrito</a></div>
                </div>
            </div>
        `;

        prodMain.append(creaDiv);

        const botonAgregar = document.querySelector(`#prod${e.id}`);

        botonAgregar.addEventListener('click', () => {
            agregarAlCarrito(e.id)
        });



    })
}

//LLAMADO INICIAL DE LISTAR PRODUCTOS
listarProductos(productos);



qProd.forEach((e) => e.addEventListener('click', (event) => {
    event.preventDefault();
    if (e.className.includes('barra')) {
        const filtrado = filtro(productos, 'barra');
        console.log(filtrado)
        const div = listarProductos(filtrado);
    } else if (e.className.includes('disco')) {
        const filtrado = filtro(productos, 'disco');
        const div = listarProductos(filtrado);
    } else if (e.className.includes('mancuerna')) {
        const filtrado = filtro(productos, 'mancuerna');
        const div = listarProductos(filtrado);
    } else {
        prodMain.innerHTML = "";
        const div = document.createElement('div');
        div.classList.add('prodMain__elemento', 'col', 'mb-2');
        div.id = 'proximamente';
        div.innerHTML = "<span>Proximamente</span>";
        prodMain.append(div);
    };
}));

const actualizarCarrito = () => {
    contCarrito.innerHTML = ""
    carrito.forEach((prod, i) => {
        const li = document.createElement('li')
        li.className = "d-flex flex-row align-items-center justify-content-between"
        li.innerHTML = `
    <span class="caps nomProd">${prod.nombre} ${prod.peso}kg.</span>
    <span>Precio: $${prod.precio}</span>
    <button id="carr${i}" class="btn text-danger"><i class="bi bi-x-circle"></i></button>
    `
        contCarrito.append(li)
        const botonEliminar = document.querySelector(`#carr${i}`);
        botonEliminar.addEventListener('click', () => {
            eliminarDelCarrito(i)
        });
    })
    cantidadEnCarrito.innerText = carrito.length
    const pTotal = carrito.reduce((acc, carr) => acc + carr.precio, 0)
    total.innerText = `$${pTotal}`
}

const agregarAlCarrito = (id) => {
    const prod = productos.find((prod) => prod.id === id)
    carrito.push(prod)
    actualizarCarrito()
};

const eliminarDelCarrito = (i) => {
    carrito.splice(i, 1)
    actualizarCarrito()
    if (carrito.length == 0) {
        contCarrito.innerHTML = `<span class="caps nomProd">Carrito vacío</span>`
    }
}

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    contCarrito.innerHTML = `<span class="caps nomProd">Carrito vacío</span>`
})