/**
 * 二叉查找树 BST
 * 具备一个根节点、以及添加、查找、删除节点的方法
 */

/**
 * Node
 */
class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

/**
 * BinarySearchTree
 */
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * 插入
   */
  insert(data) {
    let n = new Node(data, null, null);
    if (!this.root) { // 如果此二叉树为空，则数据项从树的root节点处开始插入
      return this.root = n;
    }

    let currentNode = this.root;
    let parent;
    while (true) {
      parent = currentNode;
      if (data < currentNode.data) { // 插在父节点的左节点
        currentNode = currentNode.left;
        if (currentNode === null) { // 不断向左node寻找是否为null
          parent.left = n;
          break;
        }
      } else { // 插在父节点的右节点
        currentNode = currentNode.right;
        if (currentNode === null) {
          parent.right = n;
          break;
        }
      }
    }
  }

  /**
   * 删除
   */
  remove(data) {
    this.root = this._removeNode(this.root, data);
  }

  /**
   * 删除节点
   *
   * 删除树中与给定值相同的节点，如果树中没有相同值的节点，则不做处理，
   * 应该保证处理之后的树仍是二叉查找树。
   */
  _removeNode(node, data) {
    if (node === null) { // 如果根节点为空
      return null;
    }
    if (data === node.data) {
      // 没有子节点，即node为叶子节点
      if (node.left === null && node.right === null) {
        return null;
      }
      // 要删除的节点下只有右节点
      if (node.left === null) {
        return node.right;
      }
      // 要删除的节点下只有左节点
      if (node.right === null) {
        return node.left;
      }
      // 要删除的节点下有两个子节点的情况
      // getSmallest用于找到该节点右子树中的最小节点，用以替代要删除的节点，然后删除此最小节点
      let getSmallest = function (node) {
        if (node.left === null && node.right === null) {
          return node;
        }
        if (node.left !== null) {
          return node.left;
        }
        if (node.right !== null) {
          return getSmallest(node.right);
        }
      };
      let temNode = getSmallest(node.right);
      node.data = temNode.data;
      node.right = this._removeNode(temNode.right, temNode.data);
      return node;
    } else if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else {
      node.right = this._removeNode(node.right, data);
      return node;
    }
  }

  /**
   * 查找
   */
  find(data) {
    let currentNode = this.root;
    while (currentNode !== null) {
      if (data === currentNode.data) {
        return currentNode;
      }
      if (data < currentNode.data) {
        if (currentNode.left !== null) {
          currentNode = currentNode.left;
        } else {
          return null;
        }
      } else {// data > currentNode.data
        if (currentNode.right !== null) {
          currentNode = currentNode.right;
        } else {
          return null;
        }
      }
    }
  }

  /**
   * 中序遍历二叉树
   */
  inOrderTraverse(cb) {
    this._inOrderTraverseNode(root, cb);
  }

  _inOrderTraverseNode(node, cb) {
    if (node !== null) {
      this._inOrderTraverseNode(node.left, cb);
      cb(node);
      this._inOrderTraverseNode(node.right, cb);
    }
  }
}

module.exports = BinarySearchTree
