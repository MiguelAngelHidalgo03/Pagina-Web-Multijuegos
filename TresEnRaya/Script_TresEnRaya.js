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

//Variable menu para que no tengan el mismo emote
const formaXSelect = document.getElementById("formaX");
const formaOSelect = document.getElementById("formaO");

// const nombreJ1 = document.getElementById("nombreJ1");
// const nombreJ2 = document.getElementById("nombreJ2");

// nombreJ1.value = "Jugador1";
// nombreJ2.value = "Jugador2";

let nombreJ1 = "Jugador 1";
let nombreJ2 = "Jugador 2";

    
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

//Funcionalidad del juego
message.innerHTML = `Turno: ${nombreJ1}`;
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function(ev) {
        if (this.innerHTML === "") { // Verifica si la celda está vacía
            if (turnX) {
                this.innerHTML = `<span class='x' style="color: ${colorX};">${formaX}</span>`;  // Muestra "X" con la clase
                estadoTablero[i] = "X"; // Guarda "X" en el estado del tablero
                message.innerHTML = `Turno: ${nombreJ2}`;
            } else {
                this.innerHTML = `<span class='o' style="color: ${colorO};">${formaO}</span>`;  // Muestra "O" con la clase
                estadoTablero[i] = "O";
                message.innerHTML = `Turno: ${nombreJ1}`;
            }
            ganador();
            turnX = !turnX; // Cambia de turno
        }
    });
}

    
//Eliminar boton reinicio hasta que la partida haya finalizado (ganar, perder, empate)
restartButton.style.display = "none";

// Función para verificar el ganador
function ganador() {

    let winner = false;

    for (let i = 0; i < patronWinner.length; i++) {
        const [a, b, c] = patronWinner[i]; // Desestructura el patrón

        // Comprueba si hay un ganador
        if (estadoTablero[a] === estadoTablero[b] && estadoTablero[a] === estadoTablero[c] && estadoTablero[a] !== "") {

            //Resaltar las celdas ganadoras
            cells[a].classList.add("celda-ganadora");
            cells[b].classList.add("celda-ganadora");
            cells[c].classList.add("celda-ganadora");

            //Mostrar boton reiniciar
            restartButton.style.display = "block";

            if (estadoTablero[a] === "X") 
            {
                victoriasX++;
                document.getElementById("victoriasX").innerHTML = victoriasX;
                message.innerHTML = `¡${nombreJ1} ha ganado!`;
                turnX = true;
            }
            if (estadoTablero[a] === "O")
            {
                victoriasO++;
                document.getElementById("victoriasO").innerHTML = victoriasO;
                message.innerHTML = `¡${nombreJ2} ha ganado!`;
                turnX = false;
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

        //Mostrar boton reiniciar
        restartButton.style.display = "block";

        let numAleatorioTurno = Math.round(Math.random()); //Variable en empate para decidir quien juega
        if (numAleatorioTurno === 0) {
            turnX = false;
        }   
        else {
            turnX = true;
        }

        cellsBloq.forEach(cellsBloq => {
            cellsBloq.style.pointerEvents = "none"; // Activa los clics en la celda después de reiniciar
        });
    }
}


// Funcionalidad de reinicio
restartButton.addEventListener("click", function() {
    for (let cell of cells) {
        cell.innerHTML = ""; // Limpia el contenido de todas las celdas
    }
    message.innerHTML = ""; // Limpia el mensaje
    for (let i = 0; i < estadoTablero.length; i++) {
        estadoTablero[i] = ""; // Limpia el estado del tablero
    }
    cellsBloq.forEach(cellsBloq => {
        cellsBloq.style.pointerEvents = "auto"; // Activa los clics en la celda después de reiniciar
    });
    
    //Mostrar mensaje despues de boton restart y empate
    if (!turnX) 
    {
        message.innerHTML = `Turno: ${nombreJ2}`;
    }
    else
    {
        message.innerHTML = `Turno: ${nombreJ1}`;
    }


    //Quitar remarcado cuando se reincia
    for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("celda-ganadora");
    }

    //Eliminar boton reinicio hasta que la partida haya finalizado (ganar, perder, empate)
    restartButton.style.display = "none";


});



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
    actualizarOpcionesJugador2();
});

document.getElementById("formaO").addEventListener("change", function() {
    formaO = this.value;
    actualizarOpcionesJugador1();
});

document.getElementById("colorX").addEventListener("input", function() {
    colorX = this.value;
});

document.getElementById("colorO").addEventListener("input", function() {
    colorO = this.value;
});


this.innerHTML = `<span class='x' style="color: ${colorX};">${formaX}</span>`; 



// Función para actualizar las opciones del Jugador 2
function actualizarOpcionesJugador2() {
    const seleccionJ1 = formaXSelect.value;

    // Habilitar todas las opciones en el select del Jugador 2
    for (let option of formaOSelect.options) {
        option.disabled = false; // Habilita todas las opciones
    }

    // Deshabilitar la opción seleccionada por el Jugador 1 en el select del Jugador 2
    for (let option of formaOSelect.options) {
        if (option.value === seleccionJ1) {
            option.disabled = true; // Deshabilita la opción si es igual a la de Jugador 1
        }
    }
}

// Función para actualizar las opciones del Jugador 1
function actualizarOpcionesJugador1() {
    const seleccionJ2 = formaOSelect.value;

    // Habilitar todas las opciones en el select del Jugador 1
    for (let option of formaXSelect.options) {
        option.disabled = false; // Habilita todas las opciones
    }

    // Deshabilitar la opción seleccionada por el Jugador 2 en el select del Jugador 1
    for (let option of formaXSelect.options) {
        if (option.value === seleccionJ2) {
            option.disabled = true; // Deshabilita la opción si es igual a la de Jugador 2
        }
    }
}

// Inicializar las opciones al cargar la página
actualizarOpcionesJugador2();
actualizarOpcionesJugador1();




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


    // Si el nombre es solo espacio en blanco se cambia al nombre predeterminado
    if (nombreJ1 === "") {
        nombreJ1 = "Jugador 1";
    }

    if (nombreJ2 === "") {
        nombreJ2 = "Jugador 2";
    }

    document.getElementById("nombreJ1Mostrar").textContent = nombreJ1;
    document.getElementById("nombreJ2Mostrar").textContent = nombreJ2;

    //Para que se actualice al momento
    if (turnX) {
        message.innerHTML = `Turno: ${nombreJ1}`;
    }
    else{
        message.innerHTML = `Turno: ${nombreJ2}`;
    }
    

    
    

});
