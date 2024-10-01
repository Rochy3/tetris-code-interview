/* eslint-disable comma-dangle */
/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable no-return-assign */
import { update, piece, pieceQueue, scoreHeap } from "./main";
import { TwoDimHashTable } from "./data_structures/HashTable";
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  BLOCK_SIZE,
  PIECES_BOARD_WIDTH,
} from "./consts";

const $section = document.querySelector("section");
const $score = document.querySelector("span");

const $scoreBoard = document.querySelector(".scores");

const piecesCanvas = document.querySelector("#pieces");
const piecesContext = piecesCanvas.getContext("2d");

const gameCanvas = document.querySelector("canvas");
const gameContext = gameCanvas.getContext("2d");

const audio = new window.Audio("./tetris.mp3");

export let currentColor = "yellow"
export const setColor = (newColor) => (currentColor = newColor)

export let board;
export let score = 0;
export const setScore = (newScore) => (score = newScore);

export function start() {
  gameCanvas.width = BLOCK_SIZE * BOARD_WIDTH;
  gameCanvas.height = BLOCK_SIZE * BOARD_HEIGHT;
  gameContext.scale(BLOCK_SIZE, BLOCK_SIZE);

  piecesCanvas.width = BLOCK_SIZE * PIECES_BOARD_WIDTH;
  piecesCanvas.height = BLOCK_SIZE * PIECES_BOARD_WIDTH;
  piecesContext.scale(BLOCK_SIZE, BLOCK_SIZE);

  board = new TwoDimHashTable(BOARD_HEIGHT, BOARD_WIDTH);

  $section.addEventListener("click", () => {
    update();

    $section.remove();
    audio.volume = 0.01;
    audio.play();
  });
}

export function drawNextPiece() {
  // todo el tablero
  piecesContext.fillStyle = "black";
  piecesContext.fillRect(0, 0, piecesCanvas.width, piecesCanvas.height);
  for (let y = 0; y < PIECES_BOARD_WIDTH; y++) {
    for (let x = 0; x < PIECES_BOARD_WIDTH; x++) {
      if (pieceQueue.peek()[y] != null && pieceQueue.peek()[y][x] === 1) {
        piecesContext.fillStyle = "blue";
        piecesContext.fillRect(x + 1, y + 1, 1, 1);
      }
    }
  }
}

export function drawBoard() {
  // todo el tablero
  gameContext.fillStyle = "#000";
  gameContext.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      if (board.getValue(y, x) === 1) {
        gameContext.fillStyle = currentColor;
        gameContext.fillRect(x, y, 1, 1);
      }
    }
  }
  const shape = piece.shape.getShape();
  shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        gameContext.fillStyle = currentColor;
        gameContext.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    });
  });

  $score.innerText = score;
}

export function drawScores() {
  $scoreBoard.innerHTML = ""

  scoreHeap.getTopScores(5).forEach((score, index) => {
    const newElement = document.createElement('div')
    newElement.textContent = `Puntaje ${index + 1}: ${score}`;
    $scoreBoard.appendChild(newElement);
  });
}
