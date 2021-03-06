///////////////////////////////// VARIABLES

let producto;
let cantidad = 1;
let productos = [];
let precioTotal = 0;
let carrito = [];

if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
}

///////////////////////////////// CARGA DE PRODUCTOS

const cargarProductos = async () => {
    const respuesta = await fetch("./productos.json");
    data = await respuesta.json();
    productos = data;
    listarProductos(productos);
};

///////////////////////////////// QUERIES SOBRE DOCUMENT

const qProd = document.querySelectorAll(".qProd");
const prodMain = document.querySelector(".prodMain");
const home = document.querySelector(".home");
const contCarrito = document.querySelector(".contCarrito");
const cantidadEnCarrito = document.querySelector(".cantidadEnCarrito");
const h5Total = document.querySelector(".total");
const botonVaciar = document.querySelector(".botonVaciar");

/////////////////////////////////// FUNCIONES

/////// FUNCIÓN FILTRO (nav)

const filtro = (queryCat) => {
    const accFilt = productos.filter((el) => {
        for (let cat of el.categoria) {
            if (cat == queryCat) {
                return true
            }
        }
    })
    return accFilt
};

/////////////////////////////////// CONTADORES EN TARJETAS

//RESTA
const restQ = (e) => {
    const contador = document.querySelector(`#prod${e.id} span`);
    let contadorN = parseInt(contador.innerText);
    if (contadorN > 1) {
        contadorN--;
        contador.innerText = `${contadorN}`;
        //GUARDADO TEMPORAL DE LA CANTIDAD SELECCIONADA DEL ITEM
        sessionStorage.setItem(`'cant-${e.nombre}${e.id}'`, `${contador.innerText}`);
    }
};

//SUMA
const sumQ = (e) => {
    const contador = document.querySelector(`#prod${e.id} span`);
    let contadorN = parseInt(contador.innerText);
    contadorN++;
    contador.innerText = `${contadorN}`;
    //GUARDADO TEMPORAL DE LA CANTIDAD SELECCIONADA DEL ITEM
    sessionStorage.setItem(`'cant-${e.nombre}${e.id}'`, `${contador.innerText}`);
};

/////////////////////////////////// RENDERIZADO DEL MAIN
const listarProductos = (arrayFiltrado) => {
    prodMain.innerHTML = "";
    arrayFiltrado.forEach((e) => {
        const creaDiv = document.createElement("div");
        //INICIALIZA LA CANTIDAD SELECCIONADA DEL ITEM POR TARJETA
        let numItems = 1;
        sessionStorage.setItem(`'cant-${e.nombre}${e.id}'`, `${numItems}`);
        creaDiv.classList.add("prodMain__elemento", "col", "mb-5");
        creaDiv.dataset.aos = 'fade-up'
        creaDiv.innerHTML = `
            <div id="card${e.id}" class="card h-100">
                <img class="card-img-top p-3" src="./assets/${e.img}" alt="${e.nombre}" />
                <div class="card-body p-4">
                    <div id="precio${e.id}" class="text-center">
                        <h5 class="fw-bolder caps">${e.nombre}</h5>
                        <span>$${e.precio}</span>
                    </div>
                </div>
                <div id="prod${e.id}" class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center d-flex flex-column-reverse flex-sm-row">
                    <a class="btn btn-outline-dark w-100">
                    <i class="bi-cart-fill me-1">
                    </i><p class="m-auto">Agregar al <br>
                    carrito</p></a>
                    <div class="d-flex flex-row-reverse mb-2 mb-sm-auto flex-sm-column botonesQ justify-content-evenly">
                        <button class="cantidad mas btn btn-outline-dark rounded-pill">+</button>
                        <span class="badge bg-dark text-white rounded-pill my-0 mx-1 px-3 my-sm-1 mx-sm-0 px-sm-0">${numItems}</span>
                        <button class="cantidad menos btn btn-outline-dark rounded-pill">-</button>
                    </div>
                </div>
            </div>
        `;
        prodMain.append(creaDiv);

        //AGREGADOS DE ESTILO Y MODIFICACION DE PRECIO EN CASO DE PRODUCTO EN OFERTA
        if (e.categoria.find((cat) => cat == "oferta")) {
            const divCard = document.querySelector(`#card${e.id}`)
            const etiqOferta = document.createElement('div')
            etiqOferta.className = "badge bg-dark text-white position-absolute"
            etiqOferta.style.right = "0.7rem";
            etiqOferta.style.top = "0.7rem"
            etiqOferta.innerText = "Oferta"
            const porcentaje = (100 - ((100 / e.precio) * e.pOferta)).toFixed(2)
            divCard.append(etiqOferta)
            const divPrecio = document.querySelector(`#precio${e.id}`)
            divPrecio.innerHTML = `
                        <h5 class="fw-bolder caps">${e.nombre}</h5>
                        <small class="text-muted text-decoration-line-through">$${e.precio}</small>
                        <small class="text-success"> -${porcentaje}%</small><br/>
                        <span>$${e.pOferta}</span>`
        }
        const botonAgregar = document.querySelector(`#prod${e.id} a`);
        botonAgregar.addEventListener("click", () => {

            agregarAlCarrito(e);

            //RESETEA CONTADOR AL AGREGAR A CARRITO
            const contador = document.querySelector(`#prod${e.id} span`);
            contador.innerText = 1;
        });

        //EVENTOS PARA LLAMAR A LAS FUNCIONES DE MODIFICACION DE NUMERO DE PRODUCTOS A AGREGAR
        const botonMas = document.querySelector(`#prod${e.id} .mas`);
        botonMas.addEventListener("click", () => sumQ(e));

        const botonMenos = document.querySelector(`#prod${e.id} .menos`);
        botonMenos.addEventListener("click", () => restQ(e));
    });
};


////////////////////////////// CARRITO

//// TOTAL CARRITO

const funcTotal = () => {
    const pTotal = carrito.reduce((acc, carr) => acc + carr.precio * carr.cantidad, 0);
    h5Total.innerText = `$${pTotal}`;
    return pTotal;
};

//// ACTUALIZAZIÓN DEL CARRITO - AGREGA, ELIMINA INDIVIDUALMENTE Y VACÍA CARRITO
const actualizarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))

    contCarrito.innerHTML = "";

    if (carrito.length == 0) {
        //SI EL ARRAY CARRITO ESTÁ VACÍO APARECE ESTE MENSAJE
        contCarrito.innerHTML = `<p class="caps nomProd my-4 fs-5">Carrito vacío</p>`;
    } else {
        carrito.forEach((prod, i) => {
            const li = document.createElement("li");
            // li.className = "d-flex flex-row align-items-center justify-content-between";
            li.className = "row align-items-center"
            li.innerHTML = `
    <span class="caps nomProd col-5 col-sm-6">${prod.nombre}</span>
    <span class="fst-italic col col-sm-2">${prod.cantidad} u.</span>
    <strong class="col-3 col-sm">$${prod.precio*prod.cantidad}</strong>
    <button id="carr${i}" class="btn text-danger col-1"><i class="bi bi-x-circle"></i></button>
    `;
            contCarrito.append(li);

            //BOTON ELIMINAR DEL CARRITO
            const botonEliminar = document.querySelector(`#carr${i}`);
            botonEliminar.addEventListener("click", () => {
                eliminarDelCarrito(i);
            });
        });
    }
    //FIJA CANTIDAD ITEMS DIFERENTES EN CARRITO EN EL CONTADOR QUE SE MUESTRA EN BOTON CARRITO
    cantidadEnCarrito.innerText = carrito.length;

    //EL PRECIO TOTAL ES EL PRECIO DEL PRODUCTO POR LA VARIABLE CANTIDAD DEL OBJ EN CARRITO
    precioTotal = funcTotal();
};

////// FUNCIÓN AGREGAR AL CARRITO
const agregarAlCarrito = (el) => {
    //TOMA DE VARIABLE DEL CONTADOR ALMACENADA EN SESSION
    const cantidad = parseInt(
        sessionStorage.getItem(`'cant-${el.nombre}${el.id}'`)
    );

    //TOAST
    Toastify({
        text: `Agregó: \n ${el.nombre} por ${cantidad} u.`,
        duration: 900,
        stopOnFocus: false,
        style: {
            "text-transform": "capitalize",
            padding: "1em",
            background: "#212121",
            border: "3px solid #f44336",
            "border-radius": ".4em",
            color: "#fff",
        },
    }).showToast();

    //BUSCA SI EL ITEM A AGREGAR ESTA YA EN CARRITO
    let yaEnCarrito = carrito.find((item) => item.id === el.id);
    //SUMA POR CADA UNIDAD QUE SE AGREGUE, CUANDO EL ITEM YA ESTA EN EL CARRITO
    if (yaEnCarrito) {
            yaEnCarrito.cantidad += cantidad;
    } else {
        //EVALUA SI EL PRODUCTO ESTÁ EN OFERTA Y LO ENVIA A CARRITO CON PRECIO DE OFERTA O REGULAR
        let {
            id,
            nombre,
            precio,
            pOferta,
            img
        } = productos.find((item) => item.id === el.id);

        if (el.categoria.find((cat) => cat == "oferta")) {
            carrito.push({
                id: id,
                nombre: nombre,
                precio: pOferta,
                img: img,
                //SE TOMA LA CANTIDAD GUARDADA EN CONTADOR COMO VALOR INICIAL DE CANTIDAD EN CARRITO
                cantidad: cantidad,
            });
        } else {
            carrito.push({
                id: id,
                nombre: nombre,
                precio: precio,
                img: img,
                cantidad: cantidad,
            });
        };
    }

    actualizarCarrito();

    //RESET DE LA VARIABLE CANTIDAD EN SESSION STORAGE
    sessionStorage.setItem(`'cant-${el.nombre}${el.id}'`, 1);
};
//
const eliminarDelCarrito = (i) => {
    carrito.splice(i, 1);
    actualizarCarrito();
};

botonVaciar.addEventListener("click", () => {
    if (carrito.length == 0) {
        Toastify({
            text: `El carrito ya está vacío`,
            position: "left",
            duration: 3000,
            stopOnFocus: false,
            style: {
                padding: "1em",
                background: "#212121",
                border: "3px solid #f44336",
                "border-radius": ".4em",
                color: "#fff",
            },
        }).showToast();
    } else {
        carrito.length = 0;
        actualizarCarrito();
        contCarrito.innerHTML = `<p class="caps nomProd my-4 fs-5">Carrito vacío</p>`;
        Toastify({
            text: `Se vació el carrito`,
            position: "left",
            duration: 3000,
            stopOnFocus: false,
            style: {
                padding: "1em",
                background: "#212121",
                border: "3px solid #f44336",
                "border-radius": ".4em",
                color: "#fff",
            },
        }).showToast();
    }
});

////////////// EVENTOS FILTRA BUSQUEDA

qProd.forEach((opcion) =>
    opcion.addEventListener("click", () => {
        if (opcion.className.includes("barra")) {
            const filtrado = filtro("barra");
            listarProductos(filtrado);
        } else if (opcion.className.includes("disco")) {
            const filtrado = filtro("disco");
            listarProductos(filtrado);
        } else if (opcion.className.includes("mancuerna")) {
            const filtrado = filtro("mancuerna");
            listarProductos(filtrado);
        } else if (opcion.className.includes("accesorio")) {
            const filtrado = filtro("accesorio");
            listarProductos(filtrado);
        } else if (opcion.className.includes("oferta")) {
            const filtrado = filtro("oferta");
            listarProductos(filtrado);
        }
    })
);

////////////////////////////////////////// BOTON TO TOP
//MUESTRA BOTON AL SCROLLEAR
const showButton = () => {
    if (document.documentElement.scrollTop > 50) {
        toTopButton.style.display = "block";
    } else {
        toTopButton.style.display = "none";
    }
}

const toTopButton = document.querySelector("#toTop");

window.onscroll = () => showButton();

//VUELVE AL COMIENZO DE LA PÁGINA
toTopButton.addEventListener('click', () => document.documentElement.scrollTop = 0)


//////////////////////////////////////////////////////////////

//LLAMADO INICIAL DE CARGAR Y LISTAR PRODUCTOS
cargarProductos();

//LLAMADO INICIAL DE LISTAR PRODUCTOS EN CARRITO
actualizarCarrito();