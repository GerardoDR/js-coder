// const productos = localStorage.getItem(JSON.parse('productos'))

const ulProductos = document.querySelector('.productos__lista')


//AGREGA 'LI' POR PRODUCTO
const ArrNombresProd = productos.map( (elem) => {
    return elem.nombre
})
const nombresProd = ArrNombresProd.filter((elem,index,array) => array.indexOf(elem) === index)

nombresProd.forEach((elem) => {
const listElem = document.createElement('li')
listElem.classList.add('listElem', `${elem}`)
listElem.innerHTML=
`<span>"${elem}"</span>`
ulProductos.append(listElem)

})
//

//AGREGA DETALLES DE CADA PRODUCTO
productos.forEach( (elem) => {
const listElem = document.querySelector(`.${elem.nombre}`)

    if (elem.peso !== 0){
        const ulPeso = document.createElement('ul')

        ulPeso.innerHTML =  `
        <li>${elem.peso} kg.</li>
        <p>precio de lista: $${elem.precio} + iva</p>`
        listElem.append(ulPeso)
    } else{
        const pPrecio = document.createElement('p')
        pPrecio.innerText=`precio de lista: $${elem.precio} + iva`
        listElem.append(pPrecio)
    }
})

