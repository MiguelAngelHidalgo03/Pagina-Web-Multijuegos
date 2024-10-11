const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const salidaTA = document.getElementById("salidaTA");
let puntuaje = 0;

button1.addEventListener("click", function(ev) 
{
        const nuevaCarta = Math.floor(Math.random() * 10) + 1;
        puntuaje += nuevaCarta;

        if (puntuaje <= 20) 
        {
            salidaTA.value = "Tu carta es " + nuevaCarta + ". Total puntos: " + puntuaje + "\n" + "¿Desea escoger otra carta?";
        } 
        else if (puntuaje === 21) 
        {
            salidaTA.value = "¡Felicidades! Llegaste a 21 puntos. Has ganado." + "\nPida otra carta si quieres jugar de nuevo";
            puntuaje = 0;
        } 
        else 
        {
            salidaTA.value = "Te has pasado de 21 puntos. Has perdido.\nTotal puntos: " + puntuaje + "\nPida otra carta si quieres jugar de nuevo";
            puntuaje = 0;
        }
});

button2.addEventListener("click", function(ev) 
{
            const cartaPC = Math.floor(Math.random() * 8) + 14;
            if (cartaPC > puntuaje) {
                salidaTA.value = "Perdiste. Tu contrincante tiene " + cartaPC + " puntos, y tú tienes " + puntuaje + " puntos." + "\nPida otra carta si quieres jugar de nuevo";
            } else if (cartaPC < puntuaje) {
                salidaTA.value = "Ganaste. Tu contrincante tiene " + cartaPC + " puntos, y tú tienes " + puntuaje + " puntos." + "\nPida otra carta si quieres jugar de nuevo";
            } else {
                salidaTA.value = "Empate. Ambos tienen " + puntuaje + " puntos." + "\nPida otra carta si quieres jugar de nuevo";
            }
            puntuaje = 0;  
});



/* 

Deshabilitar botones: Asegúrate de que, cuando termine el juego (victoria, derrota o empate), los botones "Pedir carta" y 
"Plantarse" se deshabiliten automáticamente, para evitar que el jugador siga interactuando después del final.

Botón de reinicio: Asegúrate de tener un botón o alguna opción para que el jugador pueda reiniciar el juego sin tener 
que recargar la página. Esto también debe restablecer el estado del juego y las puntuaciones.

Mostrar la puntuación del jugador y del dealer: Debes agregar una sección o mensaje donde se actualice y muestre la 
puntuación total del jugador y la del dealer mientras se juega.
*/