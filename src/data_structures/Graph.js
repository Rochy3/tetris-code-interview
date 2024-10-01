export class Graph {
  constructor () {
    this.adjacencyList = {}
  }

  addVertex (vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []
    }
  }

  addEdge (v1, v2) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1].push(v2)
      this.adjacencyList[v2].push(v1) // Como es no dirigido, conectamos ambos lados
    }
  }

  removeEdge (v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter((v) => v !== v2)
    this.adjacencyList[v2] = this.adjacencyList[v2].filter((v) => v !== v1)
  }

  removeVertex (vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop()
      this.removeEdge(vertex, adjacentVertex)
    }
    delete this.adjacencyList[vertex]
  }

  display () {
    for (const vertex in this.adjacencyList) {
      console.log(vertex, ':', this.adjacencyList[vertex])
    }
  }

  // Método para mostrar el grafo en el HTML
  // Método para mostrar el grafo en el HTML
  displayHTML (containerId) {
    const container = document.getElementById(containerId)
    if (!container) {
      console.error(`No se encontró un elemento con el ID "${containerId}"`)
      return
    }

    container.innerHTML = '' // Limpiar el contenedor

    for (const vertex in this.adjacencyList) {
      const vertexElement = document.createElement('div')
      vertexElement.classList.add('vertex')

      const piece = this.adjacencyList[vertex][0] // Obtener el primer objeto de la lista de adyacencias
      const vertexName = document.createElement('strong')
      vertexName.textContent = `Pieza ${piece.id}:` // Mostrar el id de la pieza
      vertexElement.appendChild(vertexName)

      const edgesList = document.createElement('ul')

      this.adjacencyList[vertex].forEach((adjacentVertex) => {
        const edgeItem = document.createElement('li')

        edgeItem.textContent = `Conectado a Pieza ${adjacentVertex.id}` // Asumimos que adjacentVertex también tiene un id
        edgesList.appendChild(edgeItem)
      })

      vertexElement.appendChild(edgesList)
      container.appendChild(vertexElement)
    }
  }
}

// Uso del grafo
const tetrisGraph = new Graph()

const pieceA = {
  id: 'A',
  shape: [
    // la pieza verde
    [1, 1],
    [1, 1]
  ]
}
const pieceB = {
  id: 'B',
  shape: [
    // la pieza verde
    [1, 1, 0],
    [0, 1, 1]
  ]
}
const pieceC = {
  id: 'C',
  shape: [
    // la pieza verde
    [0, 1, 1],
    [1, 1, 0]
  ]
}
// Ejemplo de agregar piezas como nodos y conexiones
tetrisGraph.addVertex(pieceA)
tetrisGraph.addVertex(pieceB)
tetrisGraph.addVertex(pieceC)

tetrisGraph.addEdge(pieceA, pieceB) // Conectar Pieza A con Pieza B
tetrisGraph.addEdge(pieceA, pieceC) // Conectar Pieza A con Pieza C

// Mostrar el grafo en la consola
tetrisGraph.display()

// Mostrar el grafo en el HTML
tetrisGraph.displayHTML('graph-container')
