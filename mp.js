const accessToken = "TEST-5421485677486043-112315-b8f3093d4dc6f5017f9086a28165287f-22577389"

const botonComprar = document.querySelector('#botonComprar')

const finalizarCompra = async () => {

    const carritoToMP = carrito.map((prod) => {
        return {
            title: prod.nombre,
            description: `marca ${prod.marca}`,
            picture_url: prod.img,
            category_id: prod.id,
            quantity: prod.cantidad,
            currency_id: "ARS",
            unit_price: prod.precio
        }
    })

    const resp = await fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            items: carritoToMP,
            back_urls: {
              success: window.location.href,
              failure: window.location.href
            }
        })
    })
    const data = await resp.json()

    window.location.assign(data.init_point)
}

botonComprar.addEventListener('click', () => {
    if (precioTotal > 100000) {
        Toastify({
            text: `El monto a pagar no puede superar los $ 100.000 ARS`,
            duration: 3500,
            position: "left",
            stopOnFocus: false,
            style: {
                padding: "1em",
                background: "#212121",
                border: "3px solid #f44336",
                'border-radius': ".4em",
                color: "#fff"
            },
        }).showToast();
    } else if (precioTotal === 0) {
        Toastify({
            text: `¡El carrito está vacío!`,
            duration: 3500,
            position: "left",
            stopOnFocus: false,
            style: {
                padding: "1em",
                background: "#212121",
                border: "3px solid #f44336",
                'border-radius': ".4em",
                color: "#fff"
            },
        }).showToast();
    } else {
        finalizarCompra()
    }
})