/* eslint-disable quotes */
/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
import { PIECES, BOARD_WIDTH, BOARD_HEIGHT, EVENT_MOVEMENTS, COLORS } from "./consts";
import { piece, pieceQueue, scoreHeap } from "./main.js";
import { board, drawScores, setScore, score, setColor } from "./ui.js";
import { GraphPiece } from "./data_structures/GraphPiece";

document.addEventListener("keydown", (event) => {
  if (event.key === EVENT_MOVEMENTS.LEFT) {
    piece.position.x--;
    if (checkCollision()) {
      piece.position.x++;
    }
  }

  if (event.key === EVENT_MOVEMENTS.RIGHT) {
    piece.position.x++;
    if (checkCollision()) {
      piece.position.x--;
    }
  }

  if (event.key === EVENT_MOVEMENTS.DOWN) {
    piece.position.y++;
    if (checkCollision()) {
      piece.position.y--;
      solidifyPiece();
      removeRows();
    }
  }

  if (event.key === "ArrowUp") {
    const previousShape = piece.shape.getShape(); // Store the current shape
    piece.shape.rotate(); // Rotate the graph piece

    if (checkCollision()) {
      piece.shape.initializeGraph(previousShape); // Revert if there's a collision
    }
  }
});

export function checkCollision() {
  const shape = piece.shape.getShape();
  return shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value === 1 &&
        board.getValue(y + piece.position.y, x + piece.position.x) !== 0
      );
    });
  });
}

export function solidifyPiece() {
  const shape = piece.shape.getShape();
  shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board.setValue(y + piece.position.y, x + piece.position.x, 1);
      }
    });
  });

  resetPiece();
}

export function resetPiece() {
  // reset position
  piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2);
  piece.position.y = 0;
  // get random shape
  piece.shape = getNextPiece();
  setColor(COLORS[Math.floor(Math.random() * COLORS.length)])
  // gameover
  if (checkCollision()) {
    window.alert("Game over!! Sorry!");

    scoreHeap.insert(score);
    drawScores();

    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board.setValue(y, x, 0);
      }
    }
    setScore(0);
  }
}

export function removeRows() {
  const rowsToRemove = [];

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    // Verifica si toda la fila está llena
    const row = board.getRow(y);
    const isRowFull = Object.keys(row).every((x) => board.getValue(y, x) === 1);
    if (isRowFull) {
      rowsToRemove.push(y);
    }
  }

  rowsToRemove.forEach((y) => {
    // Elimina la fila y agrega una fila vacía en la parte superior
    for (let x = 0; x < BOARD_WIDTH; x++) {
      board.setValue(y, x, 0);
    }
    setScore(score + 10);
  });
  // Mueve las filas restantes hacia abajo
  rowsToRemove.reverse().forEach((y) => {
    for (let row = y; row > 0; row--) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board.setValue(row, x, board.getValue(row - 1, x));
      }
    }
    // Agrega una fila vacía en la parte superior
    for (let x = 0; x < BOARD_WIDTH; x++) {
      board.setValue(0, x, 0);
    }
  });
}

// Función para obtener la siguiente pieza
export function getNextPiece() {
  const nextPiece = pieceQueue.dequeue();
  const randomPiece = PIECES[Math.floor(Math.random() * PIECES.length)];
  pieceQueue.enqueue(randomPiece); // Reponer la cola con una nueva pieza aleatoria
  // Initialize the piece as a GraphPiece
  const graphPiece = new GraphPiece(nextPiece);
  return graphPiece; // Return the GraphPiece object
}
