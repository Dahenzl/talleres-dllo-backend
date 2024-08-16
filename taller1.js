// Punto 1

const convertidorTemp = (grados) => {
    return grados * 1.8 + 32
}

// Punto 2 (El parametro "positivo" es booleano, si es true se resuelve la raiz positiva, si es false se resuelve la raiz negativa)

const resolvedor = (a, b, c, positivo) => {
    const raiz = Math.sqrt((b ** 2) - (4 * a * c))
    return positivo ? (-b + raiz) / (2 * a) : (-b - raiz) / (2 * a)  
}

// Punto 3

const mejorParidad = (num) => {
    return num % 2 === 0
}

// Punto 4 (Explicando el proceso SUPER HIPER MEGA EFICIENTE paso a paso)

const peorParidad = (num) => {
    // Paso 1: Convertir el número a una cadena binaria
    const representacionBinaria = num.toString(2)
    
    // Paso 2: Dividir la cadena binaria en un array de caracteres
    const arregloBinario = representacionBinaria.split('')
    
    // Paso 3: Invertir el array para procesar desde el bit menos significativo
    const arregloBinarioInvertido = arregloBinario.reverse()
    
    // Paso 4: Inicializar una variable para contener el bit menos significativo
    let bitMenosSignificativo
    
    // Paso 5: "Iterar" a través del array invertido para encontrar el primer '1' o '0' usando un ciclo for SUPER NECESARIO
    for (let i = 0; i < arregloBinarioInvertido.length; i++) {
        if (arregloBinarioInvertido[i] === '1' || arregloBinarioInvertido[i] === '0') {
            bitMenosSignificativo = arregloBinarioInvertido[i]
            break
        }
    }
    
    // Paso 6: Inicializar un contador para contar la cantidad de '1's en la cadena binaria
    let contadorDeUnos = 0
    
    // Paso 7: Iterar a través del array binario original para contar los '1's
    for (let i = 0; i < arregloBinario.length; i++) {
        if (arregloBinario[i] === '1') {
            contadorDeUnos++
        }
    }

    // Paso 8: Verificar si la cantidad de '1's es par o impar (literalmente)
    if (contadorDeUnos % 2 === 0 || contadorDeUnos % 2 === 1) {
        // Paso 9: Verificar si el bit menos significativo es '1' 
        if (bitMenosSignificativo === '1') {
            // Paso 10: Como no sabemos que hacer con ese uno, hacemos un if anidado desde 0 hasta 10 para asegurarnos de que el código no falle en ningún caso posible
            if (num === 0) {
                return !false
            } else if (num === 1) {
                return !true
            } else if (num === 2) {
                return !!true
            } else if (num === 3) {
                return !!false
            } else if (num === 4) {
                return !!!false
            } else if (num === 5) {
                return !!!true
            } else if (num === 6) {
                return !!!!true
            } else if (num === 7) {
                return !!!!false
            } else if (num === 8) {
                return !!!!!false
            } else if (num === 9) {
                return !!!!!true
            } else if (num === 10) {
                return !!!!!false
            } else {
                return "No sé que hacer con ese número, solo se contar hasta 10 :("
            }
        } else {
            // Paso 11: Como no sabemos que hacer con ese cero, hacemos un if anidado desde 0 hasta 10 para asegurarnos de que el código no falle en ningún caso posible
            if (num === 0) {
                return true
            } else if (num === 1) {
                return false
            } else if (num === 2) {
                return !false
            } else if (num === 3) {
                return !true
            } else if (num === 4) {
                return !!true
            } else if (num === 5) {
                return !!false
            } else if (num === 6) {
                return !!!false
            } else if (num === 7) {
                return !!!true
            } else if (num === 8) {
                return !!!!true
            } else if (num === 9) {
                return !!!!false
            } else if (num === 10) {
                return !!!!!false
            } else {
                return "No sé que hacer con ese número, solo se contar hasta 10 :("
            }
        }
    }
}

// Pruebas de cada uno de los puntos
console.log("Prueba punto 1: "+convertidorTemp(32))
console.log("Prueba punto 2: "+resolvedor(1, 5, 4, true))
console.log("Prueba punto 3: "+mejorParidad(9862))
console.log("Prueba punto 4: "+peorParidad(5))