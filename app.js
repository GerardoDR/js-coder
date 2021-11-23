/////////////////////////////////VARIABLES

let producto;
let peso;
let cantidad;
let productos = [];
const carrito = [];

/////////////////////////////////CLASS Y CREACIÓN DE OBJETOS

const cargarProductos = async () => {
    const respuesta = await fetch('./productos.json');
    data = await respuesta.json();
    productos = data
    console.log(data)    
    listarProductos(productos);
}

/////////////////////////////////

const qProd = document.querySelectorAll('.qProd');
const prodMain = document.querySelector('.prodMain');
const home = document.querySelector('.home');
const contCarrito = document.querySelector('.contCarrito');
const cantidadEnCarrito = document.querySelector('.cantidadEnCarrito');
const total = document.querySelector('.total');
const botonVaciar = document.querySelector('.botonVaciar');


const filtro = (arr, nombre) => {
    const filtrado = arr.filter((prod) => prod.nombre === nombre);
    return filtrado;
}

const restQ = (e) => {
    const contador = document.querySelector(`#prod${e.id} span`)
    let contadorN = parseInt(contador.innerText)
    if (contadorN > 1) {
        contadorN--
        contador.innerText = `${contadorN}`
        sessionStorage.setItem(`'cant-${e.nombre}${e.id}'`, `${contador.innerText}`)
    }
}
const sumQ = (e) => {
    const contador = document.querySelector(`#prod${e.id} span`)
    let contadorN = parseInt(contador.innerText);
    contadorN++
    contador.innerText = `${contadorN}`
    sessionStorage.setItem(`'cant-${e.nombre}${e.id}'`, `${contador.innerText}`)
}

const listarProductos = (arrayFiltrado) => {
    prodMain.innerHTML = "";
    arrayFiltrado.forEach((e) => {
        const creaDiv = document.createElement('div');
        let numItems = 1
        sessionStorage.setItem(`'cant-${e.nombre}${e.id}'`,`${numItems}`)
        creaDiv.classList.add('prodMain__elemento', 'col', 'mb-5');
        creaDiv.innerHTML =
            `<div class="card h-100">
                <img class="card-img-top" src="./assets/${e.img}" alt="${e.nombre}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder caps">${e.nombre} ${e.peso} kg</h5>
                        <span>$${e.precio}</span>
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div id="prod${e.id}" class="text-center d-flex">
                        <a class="btn btn-outline-dark m-auto">
                        <i class="bi-cart-fill me-1">
                        </i>Agregar al carrito</a>
                        <div class="d-flex flex-column botonesQ">
                            <button class="cantidad mas btn btn-outline-dark rounded-pill">+</button>
                            <span class="badge bg-dark text-white rounded-pill">${numItems}</span>
                            <button class="cantidad menos btn btn-outline-dark rounded-pill">-</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        prodMain.append(creaDiv);

        const botonAgregar = document.querySelector(`#prod${e.id} a`);

        botonAgregar.addEventListener('click', () => {
            agregarAlCarrito(e)
            const contador = document.querySelector(`#prod${e.id} span`)
            contador.innerText = 1
        });
        
        const botonMas = document.querySelector(`#prod${e.id} .mas`)
        botonMas.addEventListener('click', () => sumQ(e) )

        const botonMenos = document.querySelector(`#prod${e.id} .menos`)
        botonMenos.addEventListener('click', () => restQ(e) )

    })
}

//LLAMADO INICIAL DE LISTAR PRODUCTOS
// listarProductos(productos);
cargarProductos();

// //////BOTONES DE CANT PRODUCTOS
// const botonMas = document.querySelectorAll('.mas');
// const botonMenos = document.querySelectorAll('.menos');
// console.log(botonMenos)
/////////////


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
    }else if (e.className.includes('accesorio')) {
        const filtrado = filtro(productos, 'colchoneta');
        listarProductos(filtrado);
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
    `;
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

const agregarAlCarrito = (e) => {
    const prod = productos.find((prod) => prod.id === e.id)
    const cantidad = sessionStorage.getItem(`'cant-${e.nombre}${e.id}'`)
    for(i=0;i<cantidad;i++){
    carrito.push(prod)
    actualizarCarrito()
    }
    sessionStorage.setItem(`'cant-${e.nombre}${e.id}'`, 1)
};

const eliminarDelCarrito = (i) => {
    carrito.splice(i, 1);
    actualizarCarrito();
    if (carrito.length == 0) {
        contCarrito.innerHTML = `<span class="caps nomProd">Carrito vacío</span>`
    };
}

botonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    actualizarCarrito();
    contCarrito.innerHTML = `<span class="caps nomProd">Carrito vacío</span>`;
})