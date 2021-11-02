/////////////////////////////////VARIABLES

let producto;
let peso;
let cantidad;
const productos = [];

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

///////////////////////////FUNCIONES

const desc = (cantidad) => {
    if (cantidad >= 5 && cantidad < 10) {
        console.log('Se aplica 5% de descuento');
        return 5;
    } else if (cantidad >= 10) {
        console.log('Se aplica 10% de descuento');
        return 10;
    } else {
        console.log("descuento mayorista no aplicable");
        return 0;
    }
}

const stockPrecio = (producto, peso, cantidad) => {
    let precio;
    let stock;
    productos.forEach(element => {
        if (element.nombre === producto && element.peso === peso) {
            stock = element.verificarStock(cantidad);
            if (stock === true) {
                precio = element.precio;
                console.log("Stock disponible!");
            } else if (stock === false) {
                precio = false;
                console.log("Stock insuficiente. Solo tenemos " + element.stock + " unidades");
                alert("Stock insuficiente. Tenemos " + element.stock + " unidades disponibles.");
            }
        }
    })
    return precio;
}

//funcion que se introduce en calculo()
const tot = (precio, descuento) => (precio - (precio * (descuento / 100)));

//devuelve precio final
const calculo = (precio, descuento, impuesto, cantidad) => {
    let total = tot(precio, descuento);
    console.log("precio unitario bruto con descuento = $" + total);
    total = total * impuesto;
    console.log("precio unitario con descuento e impuesto = $" + total);
    total = total * cantidad;
    console.log("precio final= $" + total.toFixed(2) + " ==> " + cantidad + " unidad/es.");
    return total;
}

/////////////////////////////////

const qProd = document.querySelectorAll('.qProd');
const prodMain = document.querySelector('.prodMain');
const home = document.querySelector('.home');

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
                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Agregar al carrito</a></div>
                </div>
            </div>
        </div>
        `;           
        prodMain.append(creaDiv);
    })
}

listarProductos(productos)


qProd.forEach((e) => e.addEventListener('click', (event) => {
    event.preventDefault()
    if (e.className.includes('barra')){
        const filtrado = filtro(productos,'barra');
        console.log(filtrado)
        const div = listarProductos(filtrado);
    }else if(e.className.includes('disco')){
        const filtrado = filtro(productos,'disco');
        const div = listarProductos(filtrado)
    }else if(e.className.includes('mancuerna')){
        const filtrado = filtro(productos,'mancuerna');
        const div = listarProductos(filtrado);
    }else{
        prodMain.innerHTML="";
        const div = document.createElement('div');
        div.classList.add('prodMain__elemento', 'col', 'mb-2');
        div.id = 'proximamente'
        div.innerHTML= "<h2>PROXIMAMENTE!</h2>";
        prodMain.append(div)
    };
}));