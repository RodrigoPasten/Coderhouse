// Variables y constantes
const pruebas = ["rasgos", "numerico"];
let resultados = [];

// Función para pedir un número valido
function pedirNumero(mensaje, minimo, maximo) {
    let numero = 0;
    while (true) {
        numero = Number(prompt(mensaje));
        if (numero >= minimo && numero <= maximo) {
            return numero;
        } else {
            alert("Debe ser un número entre " + minimo + " y " + maximo);
        }
    }
}

// Función principal
function main() {
    let nombre = prompt("Ingresa tu nombre:");
    let edad = pedirNumero("Ingresa tu edad (18-65):", 18, 65);

    let puntaje = 0;
    for (let i = 0; i < 3; i++) {
        let respuesta = pedirNumero("Pregunta " + (i + 1) + " (1-5):", 1, 5);
        puntaje += respuesta;
    }

    let promedio = puntaje / 3;
    let resultado = "";

    if (promedio >= 4) {
        resultado = "Alto";
    } else if (promedio >= 3) {
        resultado = "Medio";
    } else {
        resultado = "Bajo";
    }

    let persona = {
        nombre: nombre,
        edad: edad,
        promedio: promedio.toFixed(2),
        resultado: resultado
    };

    resultados.push(persona);
    alert(
        "Evaluación de " + nombre +
        "\nEdad: " + edad +
        "\nPromedio: " + promedio.toFixed(2) +
        "\nResultado: " + resultado
    );
}
