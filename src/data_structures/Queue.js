export class Queue {
  constructor () {
    this.items = []
  }

  // Agrega un elemento a la cola
  enqueue (item) {
    this.items.push(item)
  }

  // Elimina y retorna el primer elemento de la cola
  dequeue () {
    if (this.isEmpty()) {
      return null
    }
    return this.items.shift()
  }

  // Retorna el primer elemento sin eliminarlo
  peek () {
    if (this.isEmpty()) {
      return null
    }
    return this.items[0]
  }

  // Verifica si la cola está vacía
  isEmpty () {
    return this.items.length === 0
  }

  // Retorna el tamaño de la cola
  size () {
    return this.items.length
  }

  // Limpia la cola
  clear () {
    this.items = []
  }

  // Muestra los elementos en la cola (solo para depuración)
  print () {
    console.log(this.items)
  }
}
