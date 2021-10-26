// const productos = localStorage.getItem(JSON.parse('productos'))

const ulProductos = document.querySelector('.productos__lista')

const ArrNombresProd = productos.map( (elem) => {
    return elem.nombre
})

console.log(ArrNombresProd)

const nombresProd = ArrNombresProd.filter((elem,index,array) => array.indexOf(elem) === index)

console.log(nombresProd)

// const listElem = document.createElement('li')

// listElem.classList.add('listElem')

// listElem.innerHTML=                
// `<span>"${elem.nombre}"</span>`

// ulProductos.append(listElem)
// })

