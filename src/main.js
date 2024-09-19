/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-return-assign */
import "../style.css";
import { PIECES } from "./consts";
import {
  checkCollision,
  solidifyPiece,
  removeRows,
  getNextPiece,
} from "./logic";
import { Queue } from "./data_structures/Queue";
import { start, drawBoard, drawNextPiece } from "./ui";

// Creación de la cola
export const pieceQueue = new Queue();
export const piece = {
  position: { x: 5, y: 5 },
};

// Inicializar la cola con las primeras piezas
function initializeQueue() {
  for (let i = 0; i < 5; i++) {
    const randomPiece = PIECES[Math.floor(Math.random() * PIECES.length)];
    pieceQueue.enqueue(randomPiece);
  }
}

initializeQueue();

piece.shape = getNextPiece();

let dropCounter = 0;
let lastTime = 0;

start();
console.log("started");

// -----------------

export function update(time = 0) {
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
