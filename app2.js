/////////////////////////////////VARIABLES

let producto;
let peso;
let cantidad;

/////////////////////////////////CLASS Y CREACIÓN DE OBJETOS
class Producto {

    constructor(id, nombre, peso, precio, marca, material, stock) {
        this.id = id,
        this.nombre = nombre,
        this.peso = peso,
        this.precio = precio,
        this.marca = marca,
        this.material = material,
        this.stock = stock
    }
    verificarStock = (cantDemandada) => {
        if (this.stock >= cantDemandada) {
            return true;
        } else {
            return false;
        }
    }

    restarStock = (cantDemandada) => {
        cantDemandada = parseInt(cantDemandada)
        if (this.stock >= cantDemandada) {
            this.stock -= cantDemandada;
        } else {
            alert("stock insuficiente");
        }
    }
}

///////////////////////////FUNCIONES

const desc = (cantidad) => {
    if(cantidad >= 5 && cantidad < 10){
        console.log('Se aplica 5% de descuento');
        return 5;
    }else if(cantidad >= 10){
        console.log('Se aplica 10% de descuento');
        return 10;
    }else{
        console.log("descuento mayorista no aplicable");
        return 0;
    }
}

const stockPrecio = (producto, peso, cantidad) => {
    let precio;
    let stock;
    if (!isNaN(cantidad)) {
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
    } else {
        alert("Ingreso de cantidad erroneo. Por favor, ingrese los detalles nuevamente.");
        console.log("Valor de cantidad: " + cantidad + ". Ingreso erroneo");
        precio = false;
    }
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