// Punto 1

const desglosarString = (string, tipo) => {
    const vocales = ['a', 'e', 'i', 'o', 'u']
    const consonantes = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'ñ', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
    const letras = string.toLowerCase().split('')
    if (tipo === 'vocales') {
        return letras.filter(letra => vocales.includes(letra)).length
    } else if (tipo === 'consonantes') {
        return letras.filter(letra => consonantes.includes(letra)).length
    } 
}

// Punto 2

const twoSum = (numeros, objetivo) => {
    const indices = {};
    for (let i = 0; i < numeros.length; i++) {
        const complemento = objetivo - numeros[i];
        if (indices[complemento] !== undefined) {
            return [indices[complemento], i];
        }
        indices[numeros[i]] = i;
    }
}

// Punto 3

const conversionRomana = (numeroRomano) => {
    const romanos = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    let numero = 0
    for (let i = 0; i < numeroRomano.length; i++) {
        if (romanos[numeroRomano[i]] < romanos[numeroRomano[i + 1]]) {
            numero -= romanos[numeroRomano[i]]
        } else {
            numero += romanos[numeroRomano[i]]
        }
    }
    return numero
}

// Pruebas de cada punto

console.log("Prueba punto 1: "+desglosarString('murcielagos', "consonantes")) 
console.log("Prueba punto 2: "+twoSum([2,7,11,15], 9))
console.log("Prueba punto 3: "+conversionRomana('MXMVII'))