/**
 * 打印给定数组的全排列
 * @param arr 数组
 * @param index 数组标
 * @param res 结果
 *
 *  例如：[1,2],[3,4],[5,6]]
 *  结果：
 *   [ 1, 3, 5 ]
     [ 1, 3, 6 ]
     [ 1, 4, 5 ]
     [ 1, 4, 6 ]
     [ 2, 3, 5 ]
     [ 2, 3, 6 ]
     [ 2, 4, 5 ]
     [ 2, 4, 6 ]
 */
function printArr(arr, index, res) {
  for (let subindex = 0; subindex < arr[subindex].length; subindex++) {
    if (index === 0) {
      res = []
    }
    if (index < arr.length) {
      let _res = res.slice()
      _res.push(arr[index][subindex])
      if (index === arr.length - 1) {
        console.log(_res)
      } else {
        printArr(arr, index + 1, _res)
      }
    }
  }
}
// 测试：
printArr([[1,2],[3,4],[5,6]], 0)
