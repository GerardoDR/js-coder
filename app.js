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

///////////////////////////////// FUNCIONES

////////////// FUNCIÓN FILTRO (nav)

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

////////////// CONTADORES EN TARJETAS

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

////////////// RENDERIZADO DEL MAIN
const listarProductos = (arrayFiltrado) => {
    prodMain.innerHTML = "";
    arrayFiltrado.forEach((e) => {
        const creaDiv = document.createElement("div");
        //INICIALIZA LA CANTIDAD SELECCIONADA DEL ITEM POR TARJETA
        let numItems = 1;
        sessionStorage.setItem(`'cant-${e.nombre}${e.id}'`, `${numItems}`);
        creaDiv.classList.add("prodMain__elemento", "col", "mb-5");
        creaDiv.innerHTML = `
            <div id="card${e.id}" class="card h-100">
                <img class="card-img-top p-3" src="./assets/${e.img}" alt="${e.nombre}" />
                <div class="card-body p-4">
                    <div id="precio${e.id}" class="text-center">
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
        if (e.categoria.find((cat) => cat == "oferta")) {
            const divCard = document.querySelector(`#card${e.id}`)
            const etiqOferta = document.createElement('div')
            etiqOferta.className="badge bg-dark text-white position-absolute"
            etiqOferta.style.right="0.7rem";etiqOferta.style.top="0.7rem"
            etiqOferta.innerText="Oferta"
            const porcentaje = (100 - ((100/e.precio)*e.pOferta)).toFixed(2)
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


////////////// CARRITO

////// TOTAL CARRITO

const funcTotal = () => {
    const pTotal = carrito.reduce((acc, carr) => acc + carr.precio * carr.cantidad, 0);
    h5Total.innerText = `$${pTotal}`;
    return pTotal;
};

////// ACTUALIZAZIÓN DEL CARRITO - AGREGA, ELIMINA INDIVIDUALMENTE Y VACÍA CARRITO
const actualizarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))

    contCarrito.innerHTML = "";

    if (carrito.length == 0) {
        //SI EL CARRITO ESTÁ VACÍO APARECE ESTE MENSAJE
        contCarrito.innerHTML = `<span class="caps nomProd">Carrito vacío</span>`;
    } else {
        //RENDERIZADO DE CADA ITEM EN LISTA
        carrito.forEach((prod, i) => {
            const li = document.createElement("li");
            li.className = "d-flex flex-row align-items-center justify-content-between";
            li.innerHTML = `
    <span class="caps nomProd">${prod.nombre}</span>
    <span class="fst-italic">${prod.cantidad} u.</span>
    <span>Precio por unidad:</span><strong>$${prod.precio}</strong>
    <button id="carr${i}" class="btn text-danger"><i class="bi bi-x-circle"></i></button>
    `;
            //APPEND EN CARRITO
            contCarrito.append(li);

            //BOTON ELIMINAR DEL CARRITO
            const botonEliminar = document.querySelector(`#carr${i}`);
            botonEliminar.addEventListener("click", () => {
                //LLAMADA A ELIMINAR DEL CARRITO
                eliminarDelCarrito(i);
            });
        });
    }
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
        duration: 3000,
        stopOnFocus: false,
        style: {
            "text-transform": "capitalize",
            padding: "1em",
            background: "#212121",
            border: "3px solid #f44336",
            "border-radius": ".6em",
            color: "#fff",
        },
    }).showToast();

    //BUSCA SI EL ITEM A AGREGAR ESTA YA EN CARRITO
    let yaEnCarrito = carrito.find((item) => item.id === el.id);
    //SUMA POR CADA UNIDAD QUE SE AGREGUE, CUANDO EL ITEM YA ESTA EN EL CARRITO
    if (yaEnCarrito) {
        for (i = 0; i < cantidad; i++) {
            yaEnCarrito.cantidad++;
        }
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
                "border-radius": ".6em",
                color: "#fff",
            },
        }).showToast();
    } else {
        carrito.length = 0;
        actualizarCarrito();
        contCarrito.innerHTML = `<span class="caps nomProd">Carrito vacío</span>`;
        Toastify({
            text: `Se vació el carrito`,
            position: "left",
            duration: 3000,
            stopOnFocus: false,
            style: {
                padding: "1em",
                background: "#212121",
                border: "3px solid #f44336",
                "border-radius": ".6em",
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
            console.log(filtrado)
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
        } else {
            prodMain.innerHTML = "";
            const div = document.createElement("div");
            div.classList.add("prodMain__elemento", "col", "mb-2");
            div.id = "proximamente";
            div.innerHTML = "<span>Proximamente</span>";
            prodMain.append(div);
        }
    })
);

//LLAMADO INICIAL DE CARGAR Y LISTAR PRODUCTOS
cargarProductos();

//LLAMADO INICIAL DE LISTAR PRODUCTOS EN CARRITO
actualizarCarrito();