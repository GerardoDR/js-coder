
function desc (minimo, maximo, porcentaje, cantidad) {

    for (i = minimo; i <= maximo; i++) {
        if (cantidad < minimo) {
            console.log("descuento no aplicable a cantidad")
            return 1
        } else if (cantidad == i) {
            console.log("i toma el valor de: "+i+"\n"+"porcentaje toma el valor de: "+porcentaje+"\n"+"cantidad==i")
            return porcentaje
        } else if (cantidad <= maximo) {
            porcentaje = porcentaje + 5
            console.log("i toma el valor de: "+i+"\n"+"porcentaje toma el valor de: "+porcentaje+"\n"+"cantidad<maximo")
        } else {
            porcentaje = porcentaje+porcentaje*(maximo-minimo)
            console.log("i toma el valor de: "+i+"\n"+"porcentaje toma el valor de: "+porcentaje+"\n"+"ELSE")
            return porcentaje;
        }
    }

}
desc(3, 6, 5, 9)