// Declarar un array de países, y crear una etiqueta select. Por cada país, concatenar una etiqueta option a una template de caracteres, asignando el resultado al interior de la etiqueta padre. El value de cada opción es la posición de la ciudad en la colección. Por último, agregar el select al body.

const paises = ['Argentina', 'Uruguay', 'Brasil', 'Paraguay', 'Perú', 'Bolivia', 'Venezuela']

const body = document.querySelector('body')

// const selectPaises = document.createElement('select')

const selectPaises = document.querySelector('#paises')

console.log(selectPaises)

paises.forEach((elem, index) => {

    const optionPaises = document.createElement('option')

    optionPaises.value = `${index}`

    optionPaises.innerHTML =
        `<p>${elem}</p>
    `

    selectPaises.append(optionPaises)

})

// body.append(selectPaises)