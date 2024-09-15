import './style.css'
import { BLOCK_SIZE, PIECES, BOARD_WIDTH, BOARD_HEIGHT, EVENT_MOVEMENTS } from './consts'
import { HashTable } from './HashTable'
// 1. inicializar el canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
const $score = document.querySelector('span')
const $section = document.querySelector('section')
const audio = new window.Audio('./tetris.mp3')

let score = 0

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

const board = new HashTable();

// 4. pieza player
const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1]
  ]
}

// 2. game loop
// function update () {
//   draw()
//   window.requestAnimationFrame(update)
// }

// 8. auto drop
let dropCounter = 0
let lastTime = 0

function update (time = 0) {
  const deltaTime = time - lastTime
  lastTime = time

  dropCounter += deltaTime

  if (dropCounter > 1000) {
    piece.position.y++
    dropCounter = 0

    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }

  draw()
  window.requestAnimationFrame(update)
}

function draw () {
  // todo el tablero
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      if (board.getValue(y, x) === 1) {
        context.fillStyle = 'yellow'
        context.fillRect(x, y, 1, 1)
      }
    }
  }

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = 'red'
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1)
      }
    })
  })

  $score.innerText = score
}

document.addEventListener('keydown', event => {
  if (event.key === EVENT_MOVEMENTS.LEFT) {
    piece.position.x--
    if (checkCollision()) {
      piece.position.x++
    }
  }

  if (event.key === EVENT_MOVEMENTS.RIGHT) {
    piece.position.x++
    if (checkCollision()) {
      piece.position.x--
    }
  }

  if (event.key === EVENT_MOVEMENTS.DOWN) {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
  }

  if (event.key === 'ArrowUp') {
    const rotated = []

    // ESTO ES LO MÁS COMPLICADO DE LEJOS
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = []

      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i])
      }

      rotated.push(row)
    }

    const previousShape = piece.shape
    piece.shape = rotated
    if (checkCollision()) {
      piece.shape = previousShape
    }
  }
})

function checkCollision () {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value === 1 && board.getValue(y + piece.position.y, x + piece.position.x) !== 0
      )
    })
  })
}

function solidifyPiece () {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        board.setValue(y + piece.position.y, x + piece.position.x, 1)
      }
    })
  })

  resetPiece()
}

function resetPiece () {
  // reset position
  piece.position.x = Math.floor(BOARD_WIDTH / 2 - 2)
  piece.position.y = 0
  // get random shape
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]
  // gameover
  if (checkCollision()) {
    window.alert('Game over!! Sorry!')
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        board.setValue(y, x, 0)
      }
    }
    score = 0
  }
}

function removeRows () {
  const rowsToRemove = []

  for (let y = 0; y < BOARD_HEIGHT; y++) {
    // Verifica si toda la fila está llena
    const row = board.getRow(y);
    const isRowFull = Object.keys(row).every(x => board.getValue(y, x) === 1)
    if (isRowFull) {
      rowsToRemove.push(y)
    }
  }

  rowsToRemove.forEach(y => {
    // Elimina la fila y agrega una fila vacía en la parte superior
    for (let x = 0; x < BOARD_WIDTH; x++) {
      board.setValue(y, x, 0)
    }
    score += 10
  })
  // Mueve las filas restantes hacia abajo
  rowsToRemove.reverse().forEach(y => {
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

$section.addEventListener('click', () => {
  update()

  $section.remove()
  audio.volume = 0.01
  audio.play()
})
