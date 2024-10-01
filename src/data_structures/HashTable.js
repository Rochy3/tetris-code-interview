export class TwoDimHashTable {
  constructor (width, height) {
    this.table = {}

    // Crear 30 keys principales
    for (let i = 0; i < width; i++) {
      this.table[i] = {}

      // Crear 14 keys secundarias para cada key principal
      for (let j = 0; j < height; j++) {
        this.table[i][j] = 0
      }
    }
  }

  // Método para asignar un valor en la tabla
  setValue (y, key2, value) {
    if (this.table[y] && this.table[y][key2] !== undefined) {
      this.table[y][key2] = value
    } else {
      throw new Error('Invalid keys')
    }
  }

  // Método para obtener un valor de la tabla
  getValue (y, key2) {
    if (this.table[y] && this.table[y][key2] !== undefined) {
      return this.table[y][key2]
    } else {
      return undefined
    }
  }

  // get row meto
  getRow (y) {
    return this.table[y]
  }

  print () {
    console.table(this.table)
  }
}
