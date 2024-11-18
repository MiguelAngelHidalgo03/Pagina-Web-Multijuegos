let playerMoney = 1000;
let currentBet = 0;

function placeBet(amount) {
    if (amount > playerMoney) {
        alert("No tienes suficiente dinero para esta apuesta.");
        return;
    }
    currentBet += amount;
    playerMoney -= amount;
    updateUI();
}

function updateUI() {
    document.getElementById("player-money").textContent = playerMoney;
    document.getElementById("current-bet").textContent = currentBet;
}

function dealCards() {
    if (currentBet === 0) {
        alert("Debes realizar una apuesta antes de repartir las cartas.");
        return;
    }
    // Simular reparto de cartas (añadir imágenes dinámicas después)
    document.getElementById("player-cards").innerHTML = `
        <img src="cartas/ace_of_spades.png" alt="Carta">
        <img src="cartas/king_of_hearts.png" alt="Carta">
    `;
    document.getElementById("dealer-cards").innerHTML = `
        <img src="cartas/queen_of_diamonds.png" alt="Carta">
        <img src="cartas/back.png" alt="Carta"> <!-- Reverso de carta -->
    `;
    document.getElementById("game-status").textContent = "Elige tu siguiente movimiento.";
}

function hit() {
    // Lógica para pedir una carta
    alert("Pedir carta no implementado aún.");
}

function stand() {
    // Lógica para plantarse
    alert("Plantarse no implementado aún.");
}

function doubleBet() {
    if (currentBet * 2 > playerMoney) {
        alert("No tienes suficiente dinero para doblar la apuesta.");
        return;
    }
    playerMoney -= currentBet;
    currentBet *= 2;
    updateUI();
}
