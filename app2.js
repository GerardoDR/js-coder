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
const cont = document.querySelector('.contenedor');
const home = document.querySelector('.home');
cont.id = 'contenedor-index1';
console.log(cont)

const filtro = (arr,nombre) => {
    const filtrado = arr.filter((prod) => prod.nombre === nombre);
    return filtrado;
}

const listarProductos = (arrayFiltrado) => {
    prodMain.innerHTML="";
    arrayFiltrado.forEach((e) => {
        const creaDiv = document.createElement('div');
        creaDiv.classList.add('prodMain__elemento');
        creaDiv.innerHTML= `
        <h3 class="caps">${e.nombre} ${e.peso} kg</h3>
        <img src="/assets/${e.img}" alt="${e.nombre}">
        <ul>
            <li>Precio unitario: $${e.precio}</li>
            <li>Marca: ${e.marca}</li>
            <li>Material: ${e.material}</li>
        </ul>
        `;
        prodMain.append(creaDiv);
    })
}

home.addEventListener('click', () => cont.id = "contenedor-index1")

qProd.addEventListener('click', () => cont.id='contenedor-index2')

qProd.forEach((e) => e.addEventListener('click', (event) => {
    event.preventDefault()
    if (e.className === 'qProd barra'){
        const filtrado = filtro(productos,'barra');
        console.log(filtrado)
        const div = listarProductos(filtrado);
    }else if(e.className === 'qProd disco'){
        const filtrado = filtro(productos,'disco');
        const div = listarProductos(filtrado)
    }else if(e.className === 'qProd mancuerna'){
        const filtrado = filtro(productos,'mancuerna');
        const div = listarProductos(filtrado);
    }else{
        prodMain.innerHTML="";
        const div = document.createElement('div');
        div.classList.add('prodMain__elemento');
        div.id = 'proximamente'
        div.innerHTML= "<h2>PROXIMAMENTE!</h2>";
        prodMain.append(div)
    };

}));
