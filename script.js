// Obtenemos las celdas del tablero
const cells = document.querySelectorAll('#board .cell');

// Variable para controlar el turno del jugador
let currentPlayer = 'X';

// Variable para controlar si el juego ha terminado
let gameEnded = false;

// Función para reiniciar el juego
function resetGame() {
  // Reiniciamos las variables
  currentPlayer = 'X';
  gameEnded = false;

  // Limpiamos las celdas del tablero
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-cell');
  });

  // Vaciamos el mensaje
  setMessage('');
}

// Función para mostrar un mensaje en pantalla
function setMessage(message) {
  document.getElementById('message').textContent = message;
}

// Función para comprobar si un jugador ha ganado
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6]             // Diagonales
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a].textContent === currentPlayer &&
        cells[b].textContent === currentPlayer &&
        cells[c].textContent === currentPlayer) {
      // Si encontramos una combinación ganadora, resaltamos las celdas y mostramos el mensaje
      cells[a].classList.add('winning-cell');
      cells[b].classList.add('winning-cell');
      cells[c].classList.add('winning-cell');
      setMessage(`¡${currentPlayer} ha ganado!`);
      gameEnded = true;
      return;
    }
  }

  // Si todas las celdas están ocupadas y no hay ganador, mostramos un mensaje de empate
  if (Array.from(cells).every(cell => cell.textContent !== '')) {
    setMessage('¡Empate!');
    gameEnded = true;
  }
}

// Función que se ejecuta al hacer clic en una celda del tablero
function cellClick(event) {
  const cell = event.target;

  // Si la celda ya está ocupada o el juego ha terminado, no hacemos nada
  if (cell.textContent !== '' || gameEnded) {
    return;
  }

  // Marcamos la celda con el símbolo del jugador actual
  cell.textContent = currentPlayer;

  // Verificamos si el jugador actual ha ganado
  checkWinner();

  // Cambiamos de turno al otro jugador
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Asignamos el evento click a cada celda del tablero
cells.forEach(cell => {
  cell.addEventListener('click', cellClick);
});

// Asignamos el evento click al botón de reinicio
document.getElementById('reset').addEventListener('click', resetGame);

// Iniciamos el juego
resetGame();
 

