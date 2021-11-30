const accessToken = "TEST-5421485677486043-112315-b8f3093d4dc6f5017f9086a28165287f-22577389"
const publicKey = "TEST-be8e5abe-b74c-4fe7-ad40-6d4ec7897d2f"

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
                'border-radius': ".6em",
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
                'border-radius': ".6em",
                color: "#fff"
            },
        }).showToast();
    } else {
        finalizarCompra()
    }
})


/* 
TARJETAS DE PRUEBA

Visa	4509 9535 6623 3704	123	11/25

Mastercard	5031 7557 3453 0604	123	11/25

American Express	3711 803032 57522	1234	11/25
*/


/* SOLICITUD
curl -X POST \
    'https://api.mercadopago.com/checkout/preferences' \
    -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
    -H 'Content-Type: application/json' \
    -d '{
  "items": [
    {
      "title": "Dummy Title",
      "description": "Dummy description",
      "picture_url": "http://www.myapp.com/myimage.jpg",
      "category_id": "cat123",
      "quantity": 1,
      "currency_id": "U$",
      "unit_price": 10
    }
  ],
  "payer": {
    "phone": {},
    "identification": {},
    "address": {}
  },
  "payment_methods": {
    "excluded_payment_methods": [
      {}
    ],
    "excluded_payment_types": [
      {}
    ]
  },
  "shipments": {
    "free_methods": [
      {}
    ],
    "receiver_address": {}
  },
  "back_urls": {},
  "differential_pricing": {},
  "tracks": [
    {
      "type": "google_ad"
    }
  ]
}' */

/*  RESPUESTA
 {
    "collector_id": 202809963,
    "items": [
      {
        "title": "Dummy Item",
        "description": "Multicolor Item",
        "currency_id": "$",
        "quantity": 1,
        "unit_price": 10
      }
    ],
    "payer": {
      "phone": {},
      "identification": {},
      "address": {}
    },
    "back_urls": {},
    "payment_methods": {
      "excluded_payment_methods": [
        {}
      ],
      "excluded_payment_types": [
        {}
      ]
    },
    "client_id": 6295877106812064,
    "marketplace": "MP-MKT-6295877106812064",
    "marketplace_fee": 0,
    "shipments": {
      "receiver_address": {}
    },
    "statement_descriptor": "MERCADOPAGO",
    "date_created": "2018-02-02T19:22:23.535Z",
    "id": "202809963-920c288b-4ebb-40be-966f-700250fa5370",
    "init_point": "https://www.mercadopago.com/mla/checkout/start?pref_id=202809963-920c288b-4ebb-40be-966f-700250fa5370",
    "sandbox_init_point": "https://sandbox.mercadopago.com/mla/checkout/pay?pref_id=202809963-920c288b-4ebb-40be-966f-700250fa5370"
  } */