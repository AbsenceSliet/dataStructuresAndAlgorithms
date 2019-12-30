function HashTable() {
    this.table = new Array(137)
    this.simpleHash = simpleHash
    this.put = put
    this.showDistro = showDistro
    this.betterHash = betterHash
}

function simpleHash(data) {
    var total = 0;
    for (var i = 0; i < data.length; i++) {
        total += data.charCodeAt(i)
    }
    console.log('hash value--', data, '->', total)
    return total % this.table.length
}

function put(data) {
    var pos = this.betterHash(data)
    this.table[pos] = data
}

function showDistro() {
    var n = 0;
    for (var i = 0; i < this.table.length; i++) {
        if (this.table[i] != undefined) {
            console.log(i + ':' + this.table[i])
        }
    }
}

function betterHash(string) {
    const H = 37;
    var total = 0;
    for (var i = 0; i < string.length; ++i) {
        total += H * total + string.charCodeAt(i);
    }
    total = total % this.table.length;
    console.log('hash value--', string, '->', total)
    if (total < 0) {
        total += this.table.length - 1;
    }

    return parseInt(total);
}
var someNames = ["David", "Jennifer", "Donnie", "Raymond", "Cynthia", "Mike", "Clayton", "Danny", "Jonathan"];
var hTable = new HashTable()

for (var i = 0; i < someNames.length; i++) {
    hTable.put(someNames[i])
}
hTable.showDistro()
//hash value-- David -> 80
// hash value-- Jennifer -> 12
// hash value-- Donnie -> 55
// hash value-- Raymond -> 22
// hash value-- Cynthia -> 103
// hash value-- Mike -> 82
// hash value-- Clayton -> 58
// hash value-- Danny -> 110
// hash value-- Jonathan -> 80
// 12:Jennifer
// 22:Raymond
// 55:Donnie
// 58:Clayton
// 80:Jonathan
// 82:Mike
// 103:Cynthia
// 110:Danny

/**
 * 实现二叉查找树
 * 
 */

function Node(key) {
    this.key = key
    this.left = null
    this.right = null
}

function BST() {
    this.root = null
    this.time = new Date().getTime()
    console.log(this.time)
    // 树中插入键
    this.insert = function (key) {
        let newNode = new Node(key)
        // console.log(this)
        // var insertNode =  function(node,newNode){
        //     console.log(node,newNode)
        //     if(node.key>newNode.key){
        //         if(node.left===null){
        //             node.left = newNode
        //         }else{
        //             insertNode(node.left,newNode)
        //         }
        //     }else{
        //         if(node.right===null){
        //             node.right = newNode
        //         }else{
        //             insertNode(node.right,newNode)
        //         }
        //     }
        // }
        if (this.root === null) {
            this.root = newNode
        } else {
            insertNode(this.root, newNode)
        }

    }

    // 中序遍历
    this.middleOrder = function (callback) {
        const middleOrderNode = function (node, callback) {
            if (node != null) {
                middleOrderNode(node.left, callback)
                callback(node.key)
                middleOrderNode(node.right, callback)
            }
        }
        middleOrderNode(this.root, callback)
    }
    // 先序遍历
    this.preOrder = function (callback) {
        const middleOrderNode = function (node, callback) {
            if (node != null) {
                callback(node.key)
                middleOrderNode(node.left, callback)
                middleOrderNode(node.right, callback)
            }
        }
        middleOrderNode(this.root, callback)
    }
    // 后序遍历
    this.backOrder = function (callback) {
        const middleOrderNode = function (node, callback) {
            if (node != null) {
                middleOrderNode(node.left, callback)
                middleOrderNode(node.right, callback)
                callback(node.key)
            }
        }
        middleOrderNode(this.root, callback)
    }
}

function insertNode(node, newNode) {
    console.log(node, newNode)
    if (node.key > newNode.key) {
        if (node.left === null) {
            node.left = newNode
        } else {
            insertNode(node.left, newNode)
        }
    } else {
        if (node.right === null) {
            node.right = newNode
        } else {
            insertNode(node.right, newNode)
        }
    }
}
let testArr = [3, 9, 10, 18, 7, 16, 99, 6]
let tree = new BST()

// tree.insert(9)
// tree.insert(10)
// tree.insert(22)
// tree.insert(28)
// tree.insert(16)
// tree.insert(5)

testArr.forEach(val => {
    tree.insert(val)
})
// 树的遍历, 中序遍历,先序遍历,后序遍历
// 中序遍历 按照节点上的值 以升序的方式遍历 先访问左子树,再访问根节点,最后访问右子树
// 先序遍历 先访问根节点 然后以同样方式访问左节点和右节点
// 后序遍历  先访问叶子节点,先访问左子树,再访问右子树,最后访问根节点

let time1 = time2 = time3 = 0
tree.middleOrder((val) => {
    let cousumeTime = new Date().getTime() - tree.time
    time1 += cousumeTime
    console.log(val, '45678956789')
})
tree.preOrder((val) => {
    let cousumeTime = new Date().getTime() - tree.time
    time2 += cousumeTime
    console.log(val, '45678956789')
})
tree.backOrder((val) => {
    let cousumeTime = new Date().getTime() - tree.time
    time3 += cousumeTime
    console.log(val, '45678956789')
})
console.log(time1, time2, time3)


var c_test = {
    a: 1,
    b: {
        c: function () {
            console.log(this.d)
        },
        d: 1
    }
}
c_test.b.c()