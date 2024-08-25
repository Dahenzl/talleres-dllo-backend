// Punto 1

const findMax = (numeros) => {
    let max = -Infinity
    numeros.forEach(numero => {
        if (numero > max) {
            max = numero
        }
    })
    return max
}

// Extra (función findMin para ser usada en el punto 4 en lugar de Math.min)

const findMin = (numeros) => {
    let min = Infinity
    numeros.forEach(numero => {
        if (numero < min) {
            min = numero
        }
    })
    return min
}

// Punto 2

const includes = (numeros, numero) => {
    let encontrado = false
    numeros.forEach(num => {
        if (num === numero) {
            encontrado = true
        }
    })
    return encontrado
}

// Punto 3

const sum = (numeros) => {
    let suma = 0
    numeros.forEach(numero => {
        suma += numero
    })
    return suma
}

// Punto 4

const missingNumbers = (numeros) => {
    let faltantes = []
    const menor = findMin(numeros)
    const mayor = findMax(numeros)
    for (let i = menor; i <= mayor; i++) {
        if (!includes(numeros, i)) {
            faltantes.push(i)
        }
    }
    return faltantes
}

// Pruebas de cada punto

console.log("Prueba punto 1: "+findMax([3,17,-1,4,-19]))
console.log("Prueba punto 2: "+includes([3,17,-1,4,-19], 4))
console.log("Prueba punto 3: "+sum([3,17,-1,4,-19]))
console.log("Prueba punto 4: "+missingNumbers([7,2,4,6,3,9]))