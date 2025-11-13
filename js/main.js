let resultados = [];

document.addEventListener('DOMContentLoaded', function () {
    cargarHistorial();
    inicializarEventos();
});

function inicializarEventos() {
    document.getElementById('btnNuevaEvaluacion').onclick = function () {
        resetearFormulario();
    };

    document.getElementById('btnLimpiarHistorial').onclick = function () {
        limpiarHistorial();
    };
}

document.getElementById('formularioEvaluacion').addEventListener('submit', function (event) {
    event.preventDefault();
    procesarEvaluacion();
});

function calcularPromedio(valor1, valor2, valor3) {
    let suma = valor1 + valor2 + valor3;
    let promedio = suma / 3;
    return promedio;
}

function obtenerClasificacion(promedio) {
    if (promedio >= 4) {
        return "Alto";
    } else if (promedio >= 3) {
        return "Medio";
    } else {
        return "Bajo";
    }
}

function guardarResultado(persona) {
    let datosGuardados = localStorage.getItem('evaluaciones');
    let evaluaciones = [];

    if (datosGuardados) {
        evaluaciones = JSON.parse(datosGuardados);
    }

    evaluaciones.push(persona);
    localStorage.setItem('evaluaciones', JSON.stringify(evaluaciones));
}

function procesarEvaluacion() {
    if (!validarFormulario()) {
        return;
    }

    let nombre = document.getElementById('nombre').value;
    let edad = document.getElementById('edad').value;
    let pregunta1 = Number(document.getElementById('pregunta1').value);
    let pregunta2 = Number(document.getElementById('pregunta2').value);
    let pregunta3 = Number(document.getElementById('pregunta3').value);

    let promedio = calcularPromedio(pregunta1, pregunta2, pregunta3);
    let clasificacion = obtenerClasificacion(promedio);

    let persona = {
        nombre: nombre,
        edad: edad,
        promedio: promedio.toFixed(2),
        clasificacion: clasificacion,
        fecha: new Date().toLocaleDateString()
    };

    guardarResultado(persona);
    mostrarResultado(persona);
    cargarHistorial();
}

function validarFormulario() {
    let selects = document.querySelectorAll('select');
    let todosCompletos = true;

    selects.forEach(function (select) {
        if (select.value === '') {
            select.style.borderColor = 'red';
            todosCompletos = false;
        } else {
            select.style.borderColor = '#ddd';
        }
    });

    return todosCompletos;
}

function mostrarResultado(persona) {
    let contenedor = document.getElementById('resultadoContenido');
    contenedor.innerHTML = '';

    let divResultado = document.createElement('div');
    divResultado.className = 'resultado-contenido';

    let pNombre = document.createElement('p');
    pNombre.className = 'resultado-item';
    pNombre.innerHTML = '<strong>Nombre:</strong> ' + persona.nombre;

    let pEdad = document.createElement('p');
    pEdad.className = 'resultado-item';
    pEdad.innerHTML = '<strong>Edad:</strong> ' + persona.edad + ' años';

    let pPromedio = document.createElement('p');
    pPromedio.className = 'resultado-item';
    pPromedio.innerHTML = '<strong>Promedio:</strong> ' + persona.promedio;

    let pClasificacion = document.createElement('p');
    pClasificacion.className = 'resultado-clasificacion';
    pClasificacion.textContent = 'Clasificación: ' + persona.clasificacion;

    divResultado.appendChild(pNombre);
    divResultado.appendChild(pEdad);
    divResultado.appendChild(pPromedio);
    divResultado.appendChild(pClasificacion);

    contenedor.appendChild(divResultado);

    document.getElementById('resultadoSeccion').style.display = 'block';
    document.getElementById('formularioEvaluacion').style.display = 'none';
}

function cargarHistorial() {
    let datosGuardados = localStorage.getItem('evaluaciones');
    let historialDiv = document.getElementById('historialContenido');

    if (datosGuardados) {
        let evaluaciones = JSON.parse(datosGuardados);

        if (evaluaciones.length > 0) {
            historialDiv.innerHTML = '';

            evaluaciones.forEach(function (evaluacion) {
                let divItem = document.createElement('div');
                divItem.className = 'historial-item';

                let claseClasificacion = 'clasificacion-' + evaluacion.clasificacion.toLowerCase();

                divItem.innerHTML = `
                    <p><strong>Nombre:</strong> ${evaluacion.nombre}</p>
                    <p><strong>Edad:</strong> ${evaluacion.edad} años</p>
                    <p><strong>Promedio:</strong> ${evaluacion.promedio}</p>
                    <p><strong>Clasificación:</strong> <span class="${claseClasificacion}">${evaluacion.clasificacion}</span></p>
                    <p><strong>Fecha:</strong> ${evaluacion.fecha}</p>
                `;

                historialDiv.appendChild(divItem);
            });

            aplicarEfectosHistorial();
        } else {
            historialDiv.innerHTML = '<p>No hay evaluaciones guardadas</p>';
        }
    } else {
        historialDiv.innerHTML = '<p>No hay evaluaciones guardadas</p>';
    }
}

function aplicarEfectosHistorial() {
    let items = document.querySelectorAll('.historial-item');

    items.forEach(function (item) {
        item.onmouseover = function () {
            this.style.backgroundColor = '#e8f5e9';
        };

        item.onmouseout = function () {
            this.style.backgroundColor = '#f9f9f9';
        };
    });
}

function resetearFormulario() {
    document.getElementById('formularioEvaluacion').reset();
    document.getElementById('formularioEvaluacion').style.display = 'block';
    document.getElementById('resultadoSeccion').style.display = 'none';
}

function limpiarHistorial() {
    if (confirm('¿Estás seguro de que quieres eliminar todo el historial?')) {
        localStorage.removeItem('evaluaciones');
        cargarHistorial();
    }
}