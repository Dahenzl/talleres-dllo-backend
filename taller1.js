// Punto 1

const convertidorTemp = (grados) => {
    return grados * 1.8 + 32
}

// Punto 2 (El parametro "positivo" es booleano, si es true se resuelve la raiz positiva, si es false se resuelve la raiz negativa)

const resolvedor = (a, b, c, positivo) => {
    let raiz = Math.sqrt((b ** 2) - (4 * a * c))
    if(positivo){
        return (-b + raiz) / (2 * a)
    }else{
        return (-b - raiz) / (2 * a)
    }    
}

// Punto 3

const mejorParidad = (num) => {
    return num % 2 === 0
}

// Punto 4

const peorParidad = (num) => {
    if(num === 0){
        return true
    } else {
        if(num === 1){
            return false
        } else {
            if(num === 2){
                return true
            } else{
                if (num === 3){
                    return false
                } else {
                    if (num === 4){
                        return true
                    } else{
                        if (num === 5){
                            return false
                        } else{
                            if(num === 6){
                                return true
                            } else{
                                if(num === 7){
                                    return false
                                } else{
                                    if(num === 8){
                                        return true
                                    } else{
                                        if(num === 9){
                                            return false
                                        } else{
                                            if(num === 10){
                                                return true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

// Pruebas de cada uno de los puntos
console.log("Prueba punto 1: "+convertidorTemp(32))
console.log("Prueba punto 2: "+resolvedor(1, 5, 4, false))
console.log("Prueba punto 3: "+mejorParidad(9863))
console.log("Prueba punto 4: "+peorParidad(6))