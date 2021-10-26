/* Solicitar al usuario cinco (5) tareas de forma iterativa, cargandolas en un array. Crear una etiqueta ul, y concatenar una etiqueta li a un template de caracteres por cada tarea ingresada, asignando el resultado al interior de la etiqueta ul. Por último, agregar la lista al body. */

const funcTareas = (array) => {
    for (let i = 0; i < 5; i++) {
        tarea = prompt(`Armá tu 'to do' list. Ingresá 5 tareas a realizar!\nIngreso ${i+1}:`)
        array[i] = tarea
    }
}

let tarea

const tareas = []

funcTareas(tareas)

console.log(tareas)

const body = document.querySelector('body')

const ul = document.createElement('ul')

body.append(ul)

tareas.forEach((elem, indice) => {

    const li = document.createElement('li')

    // article.classList.add('card', 'col-3', 'm-2')

    li.id = `li-${indice}`

    li.innerHTML = `
        <p>${elem}</p>
        `
    ul.appendChild(li)
})