//CLASS Y CREACIÓN DE OBJETOS
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
            this.stock -= cantDemandada
        } else {
            alert("stock insuficiente")
        }
    }
}

productos.push(new Producto(0, "barra", 15, 16000, "Rogue", "acero", 30))
productos.push(new Producto(1, "barra", 20, 19000, "Rogue", "acero", 30))
productos.push(new Producto(2, "disco", 5, 2800, "Rogue", "caucho", 60))
productos.push(new Producto(3, "disco", 10, 5800, "Rogue", "caucho", 60))
productos.push(new Producto(4, "mancuerna", 5, 1600, "Barbell", "acero", 30))
productos.push(new Producto(5, "mancuerna", 7, 2200, "Barbell", "acero", 30))
productos.push(new Producto(6, "mancuerna", 10, 3000, "Barbell", "acero", 30))

let producto
let peso
let cantidad

