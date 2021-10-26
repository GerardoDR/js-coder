// Declarar una clase Cantante, instanciando al menos cinco (5) objetos con ella, asignándoles a un array. Luego, por cada cantante crear una etiqueta div, cuya estructura interna detalle la información del objeto, agregando cada contenedor al body.

/*ACT 5 -- Usando de base la resolución de la actividad 4, añadir un ‘id’ como propiedad a la clase Cantante, y modificar las instancias, definiendo un identificador único por cada cantante.
Luego, por cada div generado, incluir un botón cuyo id de la etiqueta tenga el valor asociado a la propiedad ‘id’ del objeto, y el texto de cada botón sea ‘Contratar”.*/

const cantantes = []

class Cantante {
    constructor(nombre, edad, sexo) {
        this.nombre = nombre
        this.edad = edad
        this.sexo = sexo
    }
}

cantantes.push(new Cantante('Luismi', 44, 'M'))
cantantes.push(new Cantante('Elton John', 79, 'M'))
cantantes.push(new Cantante('Christina Aguilera', 45, 'F'))
cantantes.push(new Cantante('Chayanne', 53, 'M'))
cantantes.push(new Cantante('La bomba tucumana', 59, 'F'))

const body = document.querySelector('body')
console.log(body)

const cantantesNew = cantantes.map((elem, index) => {
    return {
        nombre: elem.nombre,
        edad: elem.edad,
        sexo: elem.sexo,
        id: index,
    }
})

console.log(cantantesNew)

cantantesNew.forEach((elem) => {

    const divCantantes = document.createElement('div')

    divCantantes.innerHTML =
        `<h2>${elem.nombre}</h2>
        <p>Edad: ${elem.edad}</p>
        <p>Sexo: ${elem.sexo}</p>
        <button id="${elem.id}">Contratar</button>
    `
    body.append(divCantantes)
})