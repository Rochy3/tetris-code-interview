/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable semi */
import "../style.css";
import { PIECES } from "./consts";
import {
  checkCollision,
  solidifyPiece,
  removeRows,
  getNextPiece
} from "./logic";
import { Queue } from "./data_structures/Queue";
import { MaxHeap } from "./data_structures/MaxHeap";
import { Graph } from "./data_structures/Graph";
import { start, drawBoard, drawNextPiece, drawScores } from "./ui";

// -----------------
export const pieceQueue = new Queue();
export const piece = {
  position: { x: 5, y: 5 }
};

// -----------------
// Uso del Max-Heap para puntuaciones
export const scoreHeap = new MaxHeap();
scoreHeap.insert(15);
scoreHeap.insert(5);
scoreHeap.insert(10);

initializeQueue();

piece.shape = getNextPiece();

let dropCounter = 0;
let lastTime = 0;
let isPaused = false; // Variable para controlar la pausa

start();
drawScores();

function initializeQueue () {
  for (let i = 0; i < 5; i++) {
    const randomPiece = PIECES[Math.floor(Math.random() * PIECES.length)];
    pieceQueue.enqueue(randomPiece);
  }
}

export function update (time = 0) {
  if (isPaused) {
    window.requestAnimationFrame(update);
    return;
  }

  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;

  if (dropCounter > 1000) {
    piece.position.y++;
    dropCounter = 0;

    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      removeRows();
    }
  }

  drawBoard();
  drawNextPiece();

  window.requestAnimationFrame(update);
}

// Función para alternar la pausa
export function togglePause () {
  isPaused = !isPaused;
 // drawPause(); // Opcional, si quieres mostrar algo durante la pausa
}

// Evento de teclado para alternar la pausa
window.addEventListener("keydown", (event) => {
  if (event.key === "p" || event.key === "P") {
    togglePause();
  }
});
