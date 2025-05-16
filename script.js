// Obtener la referencia del campo de pantalla
const pantalla = document.getElementById("pantalla");

// Lista de operadores válidos
const operadores = ["+", "-", "*", "/"];

/* Función para agregar valores a la pantalla */
function agregarValor(valor) {
    const ultimoCaracter = pantalla.value.slice(-1);

    // Evita múltiples puntos decimales
    if (valor === "." && pantalla.value.includes(".")) return;

    // Evita operadores al inicio
    if (operadores.includes(valor) && pantalla.value === "") return;

    // Reemplaza operadores repetidos
    if (operadores.includes(valor) && operadores.includes(ultimoCaracter)) {
        pantalla.value = pantalla.value.slice(0, -1) + valor;
    } else {
        pantalla.value += valor;
    }
}

/* Función para calcular el resultado de la operación */
function calcularResultado() {
    try {
        if (pantalla.value.trim() !== "") {
            // Uso de Function constructor en lugar de eval() para mayor seguridad
            pantalla.value = Function('"use strict"; return (' + pantalla.value + ')')();
        }
    } catch (error) {
        pantalla.value = "Error";
    }
}

/* Función para limpiar la pantalla */
function limpiarPantalla() {
    pantalla.value = "";
}

/* 🎯 Evento para detectar entrada por teclado */
document.addEventListener("keydown", function(event) {
    let tecla = event.key;

    switch (tecla) {
        case "Enter":
            calcularResultado();
            event.preventDefault();
            break;
        case "Backspace":
            pantalla.value = pantalla.value.slice(0, -1);
            break;
        case "Escape":
            limpiarPantalla();
            break;
        default:
            if (!isNaN(tecla) || operadores.includes(tecla) || tecla === ".") {
                agregarValor(tecla);
            }
    }
});
