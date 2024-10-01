/* eslint-disable semi */
/* eslint-disable space-before-function-paren */

export class GraphPiece {
  constructor(shape) {
    this.shape = shape; // Almacenar la forma directamente
    this.center = { x: Math.floor(shape[0].length / 2), y: Math.floor(shape.length / 2) }; // Centro calculado
    this.nodes = this.initializeNodes(); // Inicializar nodos a partir de la forma
  }

  // Inicializar los nodos a partir de la forma
  initializeNodes() {
    const nodes = [];
    for (let y = 0; y < this.shape.length; y++) {
      for (let x = 0; x < this.shape[y].length; x++) {
        if (this.shape[y][x] === 1) {
          nodes.push({ position: { x, y }, value: 1 });
        }
      }
    }
    return nodes;
  }

  // Rotar la pieza 90 grados en sentido horario
  rotate() {
    const newShape = this.shape[0].map((_, index) =>
      this.shape.map(row => row[index]).reverse() // Rotar usando transposición y reverso
    );

    this.shape = newShape; // Actualizar la forma
    this.nodes = this.initializeNodes(); // Re-inicializar nodos
  }

  // Obtener la forma actual como un arreglo 2D
  getShape() {
    return this.shape; // Devolver la forma almacenada
  }
}
