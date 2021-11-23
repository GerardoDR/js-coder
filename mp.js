const accessToken = "TEST-5421485677486043-112315-b8f3093d4dc6f5017f9086a28165287f-22577389"
const publicKey = "TEST-be8e5abe-b74c-4fe7-ad40-6d4ec7897d2f"

const botonComprar = document.querySelector('#botonComprar')

botonComprar.addEventListener('click', () => {
    finalizarCompra()
})

const finalizarCompra = async () => {

    const carritoToMP = carrito.map( (prod) => {
        return {
            title: prod.nombre,
            description: `marca ${prod.marca}`,
            picture_url: `img ${prod.marca}`,
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
    
    window.location.replace(data.init_point)
}

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