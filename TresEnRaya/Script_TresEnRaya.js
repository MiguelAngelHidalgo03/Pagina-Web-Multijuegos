/* 
Estructura HTML básica: Crea una tabla de 3x3 o divs en bloque que representen las casillas del tablero. 
Dale identificadores o clases a cada celda para poder referenciarlas en tu script.

Eventos de clic: Asocia un evento de clic a cada casilla del tablero. Cada vez que se haga clic, 
deberás cambiar el contenido de la casilla (ya sea un "X" o "O", dependiendo del turno).

Control del turno: Mantén una variable que almacene de quién es el turno, alternando entre dos 
valores (uno para "X" y otro para "O").

Verificación de victoria: Después de cada jugada, comprueba si hay tres símbolos iguales en fila, 
columna o diagonal. Puedes hacer esto creando una función que revise todas las combinaciones posibles 
de victoria.

Empate: Si todas las casillas están llenas y no hay ganador, declara un empate.

Reinicio del juego: Añade un botón de reinicio que limpie el tablero y permita volver a jugar 
desde el principio.


*/

const cells = document.getElementsByClassName("cell");
const restartButton = document.getElementById("restartButton");
const message = document.getElementById("message");
let turnX = true;
const cellsBloq = document.querySelectorAll('.cell')
    
const estadoTablero = ["", "", "", "", "", "", "", "", ""]; // Estado del tablero

const patronWinner = [
    [0, 1, 2], // Fila 1
    [3, 4, 5], // Fila 2
    [6, 7, 8], // Fila 3
    [0, 3, 6], // Columna 1
    [1, 4, 7], // Columna 2
    [2, 5, 8], // Columna 3
    [0, 4, 8], // Diagonal
    [2, 4, 6]  // Diagonal
];


for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function(ev) {
        if (this.innerHTML === "") { // Verifica si la celda está vacía
            if (turnX) {
                this.innerHTML = "<span class='x'>X</span>"; // Muestra "X" con la clase
                estadoTablero[i] = "X"; // Guarda "X" en el estado del tablero
            } else {
                this.innerHTML = "<span class='o'>O</span>"; // Muestra "O" con la clase
                estadoTablero[i] = "O";
            }
            ganador();
            turnX = !turnX; // Cambia de turno
        }
    });
}


// Funcionalidad de reinicio
restartButton.addEventListener("click", function() {
    for (let cell of cells) {
        cell.innerHTML = ""; // Limpia el contenido de todas las celdas
    }
    turnX = true; // Reinicia el turno
    message.innerHTML = ""; // Limpia el mensaje
    for (let i = 0; i < estadoTablero.length; i++) {
        estadoTablero[i] = ""; // Limpia el estado del tablero
    }
    cellsBloq.forEach(cellsBloq => {
        cellsBloq.style.pointerEvents = "auto"; // Activa los clics en la celda después de reiniciar
    });
});


// Función para verificar el ganador
function ganador() {

    let winner = false;

    for (let i = 0; i < patronWinner.length; i++) {
        const [a, b, c] = patronWinner[i]; // Desestructura el patrón

        // Comprueba si hay un ganador
        if (estadoTablero[a] === estadoTablero[b] && estadoTablero[a] === estadoTablero[c] && estadoTablero[a] !== "") {
            message.innerHTML = `¡${estadoTablero[a]} ha ganado!`; // Muestra el mensaje de victoria
            cellsBloq.forEach(cellsBloq => {
                cellsBloq.style.pointerEvents = "none"; // Desactiva los clics en la celda
            });
            return; // Sal de la función si hay un ganador
        }
    }

    // Verifica si hay empate
    if (!winner && estadoTablero.every(cell => cell !== "")) {
        message.innerHTML = "¡Es un empate!";
        cellsBloq.forEach(cellsBloq => {
            cellsBloq.style.pointerEvents = "none"; // Activa los clics en la celda después de reiniciar
        });
    }
}