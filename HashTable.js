export class HashTable {
    constructor() {
      this.table = {};
  
      // Crear 30 keys principales
      for (let i = 0; i < 30; i++) {
        this.table[i] = {};
  
        // Crear 14 keys secundarias para cada key principal
        for (let j = 0; j < 14; j++) {
          this.table[i][j] = 0; // Inicializamos con null o con cualquier valor que desees
        }
      }
    }
  
    // Método para asignar un valor en la tabla
    setValue(key1, key2, value) {
      if (this.table[key1] && this.table[key1][key2] !== undefined) {
        this.table[key1][key2] = value;
      } else {
        throw new Error("Invalid keys");
      }
    }
  
    // Método para obtener un valor de la tabla
    getValue(key1, key2) {
      if (this.table[key1] && this.table[key1][key2] !== undefined) {
        return this.table[key1][key2];
      } else {
        return undefined;
      }
    }
    // get row meto
    getRow(key1) {
        return this.table[key1];
    }
  
    // Método para mostrar la tabla completa (opcional)
    printTable() {
      console.table(this.table);
    }
  }