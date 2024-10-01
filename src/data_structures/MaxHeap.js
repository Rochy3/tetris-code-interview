export class MaxHeap {
  constructor () {
    this.heap = []
  }

  insert (score) {
    this.heap.push(score)
    this.bubbleUp()
  }

  bubbleUp () {
    let index = this.heap.length - 1
    while (index > 0) {
      const element = this.heap[index]
      const parentIndex = Math.floor((index - 1) / 2)
      const parent = this.heap[parentIndex]

      if (parent >= element) break
      this.heap[index] = parent
      this.heap[parentIndex] = element
      index = parentIndex
    }
  }

  extractMax () {
    const max = this.heap[0]
    const end = this.heap.pop()
    if (this.heap.length > 0) {
      this.heap[0] = end
      this.sinkDown(0)
    }
    return max
  }

  sinkDown (index) {
    const length = this.heap.length
    const element = this.heap[index]

    while (true) {
      const leftChildIndex = 2 * index + 1
      const rightChildIndex = 2 * index + 2
      let leftChild, rightChild
      let swap = null

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex]
        if (leftChild > element) {
          swap = leftChildIndex
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex]
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIndex
        }
      }

      if (swap === null) break
      this.heap[index] = this.heap[swap]
      this.heap[swap] = element
      index = swap
    }
  }

  getTopScores (n) {
    return this.heap.slice(0, n).sort((a, b) => b - a)
  }
}
