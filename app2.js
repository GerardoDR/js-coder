const productos = []

class Producto {

    constructor(id, nombre, peso, precio, marca, material, stock) {
        this.id = id
        this.nombre = nombre
        this.peso = peso
        this.precio = precio
        this.marca = marca
        this.material = material
        this.stock = stock

        this.verificarStock = (cantDemandada) => {
            if (this.stock >= cantDemandada) {
                console.log("Unidades disponibles! Tenemos " + this.stock + " unidades")
            } else {
                console.log("Stock insuficiente. Solo tenemos " + this.stock + " unidades")
            }
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
productos.push(new Producto(7, "colchoneta", 0, 3000, "MIR", "espuma alta densidad", 200))


let orden = prompt("¿Ordenar por nombre, precio o stock?")

if (orden === "nombre"){

    const productosByNombre = productos.slice().sort( (a, b) => {
        if (a.nombre > b.nombre){
            return 1
        }else if (a.nombre < b.nombre) {
            return -1
        } else {
            return 0
        }
    })

    console.log (productosByNombre)

}else if(orden === "precio"){

    const productosByPrecio = productos.slice().sort( (a, b) => a.precio - b.precio)
    console.log (productosByPrecio)

}else if(orden === "stock"){

    const productosByStock = productos.slice().sort( (a, b) => a.stock - b.stock)
    console.log (productosByStock)

}else{

    alert("ingresó criterio de orden incorrecto, recargue la página")
}