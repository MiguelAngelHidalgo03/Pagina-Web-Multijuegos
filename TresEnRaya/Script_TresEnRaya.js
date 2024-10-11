const cells = document.getElementsByClassName("cell");
const restartButton = document.getElementById("restartButton");
const message = document.getElementById("message");
let turnX = true;
const cellsBloq = document.querySelectorAll('.cell');
const menuResult = document.getElementById("menuResult"); //Boton resultado victorias, derrotas, empates
let victoriasX = 0;
let victoriasO = 0;
let empates = 0;

let formaX = "X";  // Valor por defecto para la forma de X
let formaO = "O";  // Valor por defecto para la forma de O
let colorX = "#FF0000";  // Valor por defecto para el color de X (rojo)
let colorO = "#0000FF";  // Valor por defecto para el color de O (azul)

// const nombreJ1 = document.getElementById("nombreJ1");
// const nombreJ2 = document.getElementById("nombreJ2");

// nombreJ1.value = "Jugador1";
// nombreJ2.value = "Jugador2";

let nombreJ1 = "Jugador1";
let nombreJ2 = "Jugador2";

    
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

message.innerHTML = "Turno de jugador 1";
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function(ev) {
        if (this.innerHTML === "") { // Verifica si la celda está vacía
            if (turnX) {
                this.innerHTML = `<span class='x' style="color: ${colorX};">${formaX}</span>`;  // Muestra "X" con la clase
                estadoTablero[i] = "X"; // Guarda "X" en el estado del tablero
                message.innerHTML = `Turno de ${nombreJ2}`;
            } else {
                this.innerHTML = `<span class='o' style="color: ${colorO};">${formaO}</span>`;  // Muestra "O" con la clase
                estadoTablero[i] = "O";
                message.innerHTML = `Turno de ${nombreJ1}`;
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
    message.innerHTML = `Turno de ${nombreJ1}`;
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
            if (estadoTablero[a] === "X") 
            {
                victoriasX++;
                document.getElementById("victoriasX").innerHTML = victoriasX;
                message.innerHTML = `¡${nombreJ1} ha ganado!`; // Muestra el mensaje de victoria
            }
            if (estadoTablero[a] === "O")
            {
                victoriasO++;
                document.getElementById("victoriasO").innerHTML = victoriasO;
                message.innerHTML = `¡${nombreJ2} ha ganado!`; // Muestra el mensaje de victoria
            }
            cellsBloq.forEach(cellsBloq => {
                cellsBloq.style.pointerEvents = "none"; // Desactiva los clics en la celda
            });
            return; // Sal de la función si hay un ganador
        }
    }

    // Verifica si hay empate
    if (!winner && estadoTablero.every(cell => cell !== "")) {
        message.innerHTML = "¡Es un empate!";
        empates++;
        document.getElementById("empates").innerHTML = empates;
        cellsBloq.forEach(cellsBloq => {
            cellsBloq.style.pointerEvents = "none"; // Activa los clics en la celda después de reiniciar
        });
    }
}

//Boton volver al menu. DOMContentLoaded para que funcione lo primero!
document.addEventListener("DOMContentLoaded", function() {
    const volverMenu = document.getElementById("volverMenu");

    volverMenu.addEventListener("click", function() {

    window.location.href = "https://miguelangelhidalgo03.github.io/Pagina-Web-Multijuegos";

});

});

//Boton MOSTRAR resultado victorias, derrotas, empates
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("menuResult").addEventListener("click", function() {
    const tabla = document.getElementById("tablaResult");
    if (tabla.style.display === "none") {
        tabla.style.display = "table";
    } else {
        tabla.style.display = "none";
    }
});
});


document.getElementById("formaX").addEventListener("change", function() {
    formaX = this.value;
});

document.getElementById("formaO").addEventListener("change", function() {
    formaO = this.value;
});

document.getElementById("colorX").addEventListener("input", function() {
    colorX = this.value;
});

document.getElementById("colorO").addEventListener("input", function() {
    colorO = this.value;
});


this.innerHTML = `<span class='x' style="color: ${colorX};">${formaX}</span>`; 



// Abre el modal al hacer clic en "Opciones"
document.getElementById("opciones").addEventListener("click", function() {
    document.getElementById("opcionesModal").style.display = "block";
});
  
// Cierra el modal al hacer clic en la "X" (close button)
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("opcionesModal").style.display = "none";
});
  
// Cierra el modal al presionar "Esc"
document.addEventListener("keyup", function(event) {
    if (event.key === "Escape") 
    {
      document.getElementById("opcionesModal").style.display = "none";
    }
});
  
// Cierra el modal si haces clic fuera del contenido
window.onclick = function(event) {    
    if (event.target == document.getElementById("opcionesModal")) {
      document.getElementById("opcionesModal").style.display = "none";
    }
};
  
// Guardar cambios y aplicarlos al juego
document.getElementById("guardarCambios").addEventListener("click", function() {
    colorX = document.getElementById("colorX").value;
    colorO = document.getElementById("colorO").value;
    formaX = document.getElementById("formaX").value;
    formaO = document.getElementById("formaO").value;
  
    // Aplica los cambios de color y forma en las celdas
    document.querySelectorAll('.x').forEach(newX => {
        newX.style.color = colorX;
        newX.innerHTML = formaX;
    });
    document.querySelectorAll('.o').forEach(newO => {
        newO.style.color = colorO;
        newO.innerHTML = formaO;
    });
  
    // Cierra el modal
    document.getElementById("opcionesModal").style.display = "none";


    //Cambiar nombre jugadores

    // nombreJ1.value = "Jugador1";
    // nombreJ2.value = "Jugador2";

    // nombreJ1 = document.getElementById("nombreJ1");
    // nombreJ2 = document.getElementById("nombreJ2");

    nombreJ1 = document.getElementById("nombreJ1").value;
    nombreJ2 = document.getElementById("nombreJ2").value;

    document.getElementById("nombreJ1Mostrar").textContent = nombreJ1;
    document.getElementById("nombreJ2Mostrar").textContent = nombreJ2;

    //Para que se actualice al momento
    if (turnX) {
        message.innerHTML = `Turno de ${nombreJ1}`;
    }
    else{
        message.innerHTML = `Turno de ${nombreJ2}`;
    }
    
    

});


