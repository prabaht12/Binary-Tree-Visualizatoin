class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinaryTree {
  constructor() {
    this.root = null
  }

  insert(value) {
    this.root = this._insertRec(this.root, value)
  }

  _insertRec(node, value) {
    if (node === null) return new TreeNode(value)
    if (value < node.value) {
      node.left = this._insertRec(node.left, value)
    } else if (value > node.value) {
      node.right = this._insertRec(node.right, value)
    }
    return node
  }

  delete(value) {
    this.root = this._deleteRec(this.root, value)
  }

  _deleteRec(node, value) {
    if (!node) return null
    if (value < node.value) {
      node.left = this._deleteRec(node.left, value)
    } else if (value > node.value) {
      node.right = this._deleteRec(node.right, value)
    } else {
      if (!node.left) return node.right
      if (!node.right) return node.left
      let minLargerNode = this._getMin(node.right)
      node.value = minLargerNode.value
      node.right = this._deleteRec(node.right, minLargerNode.value)
    }
    return node
  }

  _getMin(node) {
    while (node.left) node = node.left
    return node
  }

  inorder(callback) {
    this._inorderRec(this.root, callback)
  }

  _inorderRec(node, callback) {
    if (!node) return
    this._inorderRec(node.left, callback)
    callback(node)
    this._inorderRec(node.right, callback)
  }

  preorder(callback) {
    this._preorderRec(this.root, callback)
  }

  _preorderRec(node, callback) {
    if (!node) return
    callback(node)
    this._preorderRec(node.left, callback)
    this._preorderRec(node.right, callback)
  }

  postorder(callback) {
    this._postorderRec(this.root, callback)
  }

  _postorderRec(node, callback) {
    if (!node) return
    this._postorderRec(node.left, callback)
    this._postorderRec(node.right, callback)
    callback(node)
  }
}

const tree = new BinaryTree()
const svg = document.getElementById("treeContainer")

function insertNode() {
  const value = parseInt(document.getElementById("nodeValue").value)
  if (!isNaN(value)) {
    tree.insert(value)
    drawTree()
  }
}

function deleteNode() {
  const value = parseInt(document.getElementById("nodeValue").value)
  if (!isNaN(value)) {
    tree.delete(value)
    drawTree()
  }
}

function traverseTree(type) {
  let order = []
  let highlightNodes = (node) => order.push(node)
  tree[type](highlightNodes)

  let i = 0
  function highlightNext() {
    if (i < order.length) {
      let element = document.getElementById(`node-${order[i].value}`)
      if (element) {
        element.classList.add("highlight")
        setTimeout(() => {
          element.classList.remove("highlight")
          i++
          highlightNext()
        }, 700)
      }
    }
  }
  highlightNext()
}

function drawTree() {
  svg.innerHTML = ""
  if (tree.root) drawNode(tree.root, window.innerWidth / 2, 50, 200)
}

function drawNode(node, x, y, offset) {
  if (!node) return

  if (node.left) {
    drawLine(x, y, x - offset, y + 80)
    drawNode(node.left, x - offset, y + 80, offset / 1.5)
  }

  if (node.right) {
    drawLine(x, y, x + offset, y + 80)
    drawNode(node.right, x + offset, y + 80, offset / 1.5)
  }

  drawCircle(node.value, x, y)
}

function drawCircle(value, x, y) {
  let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
  circle.setAttribute("cx", x)
  circle.setAttribute("cy", y)
  circle.setAttribute("r", 20)
  circle.setAttribute("class", "node")
  circle.setAttribute("id", `node-${value}`)
  svg.appendChild(circle)

  let text = document.createElementNS("http://www.w3.org/2000/svg", "text")
  text.setAttribute("x", x)
  text.setAttribute("y", y + 5)
  text.setAttribute("class", "text")
  text.textContent = value
  svg.appendChild(text)
}

function drawLine(x1, y1, x2, y2) {
  let line = document.createElementNS("http://www.w3.org/2000/svg", "line")
  line.setAttribute("x1", x1)
  line.setAttribute("y1", y1)
  line.setAttribute("x2", x2)
  line.setAttribute("y2", y2)
  line.setAttribute("stroke", "black")
  svg.appendChild(line)
}
