// Piece.js
export class Piece {
  constructor (id, shape, color) {
    this.id = id // Identificador de la pieza
    this.shape = shape // La forma de la pieza
    this.color = color // Color de la pieza
    this.position = { x: 0, y: 0 } // Posición inicial de la pieza
  }

  // Método para rotar la pieza
  rotate () {
    // Lógica para rotar la forma de la pieza
    this.shape.rotate()
  }
}

class LinkedList {

}

class EnergyCell {

}
