///////////////////////////////// VARIABLES

let producto;
let cantidad;
let productos = [];
const carrito = [];
let precioTotal = 0;

///////////////////////////////// CARGA DE PRODUCTOS

const cargarProductos = async () => {
    const respuesta = await fetch('./productos.json');
    data = await respuesta.json();
    productos = data
    listarProductos(productos);
}

///////////////////////////////// QUERIES SOBRE DOCUMENT

const qProd = document.querySelectorAll('.qProd');
const prodMain = document.querySelector('.prodMain');
const home = document.querySelector('.home');
const contCarrito = document.querySelector('.contCarrito');
const cantidadEnCarrito = document.querySelector('.cantidadEnCarrito');
const h5Total = document.querySelector('.total');
const botonVaciar = document.querySelector('.botonVaciar');

///////////////////////////////// FUNCIONES

////////////// FUNCIÓN FILTRO (nav)

const filtro = (arr, nombre) => arr.filter((prod) => prod.nombre.includes(nombre));

////////////// CONTADORES EN TARJETAS

//RESTA
const restQ = (e) => {
    const contador = document.querySelector(`#prod${e.id} span`)
    let contadorN = parseInt(contador.innerText)
    if (contadorN > 1) {
        contadorN--
        contador.innerText = `${contadorN}`
        //GUARDADO TEMPORAL DE LA CANTIDAD SELECCIONADA DEL ITEM
        sessionStorage.setItem(`'cant-${e.nombre}${e.id}'`, `${contador.innerText}`)
    }
}

//SUMA
const sumQ = (e) => {
    const contador = document.querySelector(`#prod${e.id} span`)
    let contadorN = parseInt(contador.innerText);
    contadorN++
    contador.innerText = `${contadorN}`
    //GUARDADO TEMPORAL DE LA CANTIDAD SELECCIONADA DEL ITEM
    sessionStorage.setItem(`'cant-${e.nombre}${e.id}'`, `${contador.innerText}`)
}

////////////// RENDERIZADO DEL MAIN
const listarProductos = (arrayFiltrado) => {
    prodMain.innerHTML = "";
    arrayFiltrado.forEach((e) => {
        const creaDiv = document.createElement('div');
        let numItems = 1
        //INICIALIZA LA CANTIDAD SELECCIONADA DEL ITEM POR TARJETA
        sessionStorage.setItem(`'cant-${e.nombre}${e.id}'`, `${numItems}`)
        creaDiv.classList.add('prodMain__elemento', 'col', 'mb-5');
        creaDiv.innerHTML =
            `<div class="card h-100">
                <img class="card-img-top p-3" src="./assets/${e.img}" alt="${e.nombre}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder caps">${e.nombre}</h5>
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
        //APPEND
        prodMain.append(creaDiv);

        const botonAgregar = document.querySelector(`#prod${e.id} a`);
        //EVENTO AGREGAR AL CARRITO POR CADA PRODUCTO
        botonAgregar.addEventListener('click', () => {
            //LLAMADA A FUNCION DE AGREGAR AL CARRITO
            agregarAlCarrito(e)
            //RESETEA CONTADOR AL AGREGAR A CARRITO
            const contador = document.querySelector(`#prod${e.id} span`)
            contador.innerText = 1
        });

        //EVENTOS PARA LLAMAR A LAS FUNCIONES DE MODIFICACION DE NUMERO DE PRODUCTOS A AGREGAR
        const botonMas = document.querySelector(`#prod${e.id} .mas`)
        botonMas.addEventListener('click', () => sumQ(e))

        const botonMenos = document.querySelector(`#prod${e.id} .menos`)
        botonMenos.addEventListener('click', () => restQ(e))

    })
}

//LLAMADO INICIAL DE LISTAR PRODUCTOS
cargarProductos()

////////////// EVENTOS FILTRA BUSQUEDA
qProd.forEach((e) => e.addEventListener('click', (event) => {
    event.preventDefault();
    if (e.className.includes('barra')) {
        const filtrado = filtro(productos, 'barra');
        listarProductos(filtrado);
    } else if (e.className.includes('disco')) {
        const filtrado = filtro(productos, 'disco');
        listarProductos(filtrado);
    } else if (e.className.includes('mancuerna')) {
        const filtrado = filtro(productos, 'mancuerna');
        listarProductos(filtrado);
    } else if (e.className.includes('accesorio')) {
        const filtrado = filtro(productos, 'colchoneta');
        listarProductos(filtrado);
    } else {
        //ELSE PARA LOS PRODUCTOS QUE TODAVÍA NO ESTÁN EN EL STOCK
        prodMain.innerHTML = "";
        const div = document.createElement('div');
        div.classList.add('prodMain__elemento', 'col', 'mb-2');
        div.id = 'proximamente';
        div.innerHTML = "<span>Proximamente</span>";
        prodMain.append(div);
    };
}));

////////////// CARRITO

////// TOTAL CARRITO

const funcTotal = () => {
    const pTotal = carrito.reduce((acc, carr) => acc + (carr.precio * carr.cantidad), 0)
    h5Total.innerText = `$${pTotal}`
    return pTotal
}

////// ACTUALIZAZIÓN DEL CARRITO - AGREGA, ELIMINA INDIVIDUALMENTE Y VACÍA CARRITO
const actualizarCarrito = () => {
    contCarrito.innerHTML = ""
    //RENDERIZADO DE CADA ITEM EN LISTA
    carrito.forEach((prod, i) => {
        const li = document.createElement('li')
        li.className = "d-flex flex-row align-items-center justify-content-between"
        li.innerHTML = `
    <span class="caps nomProd">${prod.nombre}</span>
    <span class="fst-italic">${prod.cantidad} u.</span>
    <span>Precio por unidad:</span><strong>$${prod.precio}</strong>
    <button id="carr${i}" class="btn text-danger"><i class="bi bi-x-circle"></i></button>
    `;
        //APPEND EN CARRITO
        contCarrito.append(li)

        //BOTON ELIMINAR DEL CARRITO
        const botonEliminar = document.querySelector(`#carr${i}`);
        botonEliminar.addEventListener('click', () => {
            //LLAMADA A ELIMINAR DEL CARRITO
            eliminarDelCarrito(i)
        });
    })
    cantidadEnCarrito.innerText = carrito.length
    //EL PRECIO TOTAL ES EL PRECIO DEL PRODUCTO POR LA VARIABLE CANTIDAD DEL OBJ EN CARRITO
    precioTotal = funcTotal()
    console.log(precioTotal)
    // const pTotal = carrito.reduce((acc, carr) => acc + (carr.precio * carr.cantidad), 0)
    // total.innerText = `$${pTotal}`
}

////// FUNCIÓN AGREGAR AL CARRITO
const agregarAlCarrito = (el) => {

    //TOMA DE VARIABLE DEL CONTADOR ALMACENADA EN SESSION
    const cantidad = sessionStorage.getItem(`'cant-${el.nombre}${el.id}'`)

    //TOAST
    Toastify({
        text: `Agregó: \n ${el.nombre} por ${cantidad} u.`,
        duration: 3000,
        stopOnFocus: false,
        style: {
            'text-transform': 'capitalize',
            padding: "1em",
            background: "#212121",
            border: "3px solid #f44336",
            'border-radius': ".6em",
            color: "#fff"
        },
    }).showToast();

    //BUSCA SI EL ITEM A AGREGAR ESTA YA EN CARRITO
    let yaEnCarrito = carrito.find((item) => item.id === el.id)
    //SUMA POR CADA UNIDAD QUE SE AGREGUE, CUANDO EL ITEM YA ESTA EN EL CARRITO
    if (yaEnCarrito) {
        for (i = 0; i < cantidad; i++) {
            yaEnCarrito.cantidad++
        }
    } else {
        //O CREA LA ENTRADA EN EL CARRITO, ESTO ES TEMA DESTRUCTURING DEL OBJ
        let {
            id,
            nombre,
            precio
        } = productos.find((item) => item.id === el.id)
        //EL OBJETO ES UTILIZADO PARA HACER UNA NUEVA ENTRADA EN EL ARRAY DE CARRITO
        carrito.push({
            id: id,
            nombre: nombre,
            precio: precio,
            //SE TOMA LA CANTIDAD GUARDADA EN CONTADOR COMO VALOR INICIAL DE CANTIDAD EN CARRITO
            cantidad: cantidad
        })
    }
    //LLAMADO A LA FUNCION PARA RENDERIZAR CARRITO
    actualizarCarrito()
    //RESET DE LA VARIABLE CANTIDAD EN SESSION STORAGE
    sessionStorage.setItem(`'cant-${el.nombre}${el.id}'`, 1)
};
//
const eliminarDelCarrito = (i) => {
    //ELIMINA EL ELEMENTO CORRESPONDIENTE AL LUGAR DEL INDICE INGRESADO
    carrito.splice(i, 1);
    actualizarCarrito();
    if (carrito.length == 0) {
        //SI EL CARRITO QUEDA VACIO LUEGO DE BORRAR EL ULTIMO ITEM APARECE ESTE MENSAJE
        contCarrito.innerHTML = `<span class="caps nomProd">Carrito vacío</span>`
    };
};

//VACIA EL CARRITO CAMBIANDO SU LENGTH A 0
botonVaciar.addEventListener('click', () => {
    carrito.length = 0;
    actualizarCarrito();
    contCarrito.innerHTML = `<span class="caps nomProd">Carrito vacío</span>`;
    Toastify({
        text: `Vaciaste el carrito`,
        position: 'left',
        duration: 3000,
        stopOnFocus: false,
        style: {
            padding: "1em",
            background: "#212121",
            border: "3px solid #f44336",
            'border-radius': ".6em",
            color: "#fff"
        },
    }).showToast();
});