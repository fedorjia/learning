/**
 * 打印青蛙跳台阶的所有方式
 * @param n 台阶数
 * @param res 结果
 *
 * 注意 不是求方式的个数，而是打印每种情况
   台阶数为10，每次跳1次或两次
 */
function step(n, res) {
  if(n === 0) {
    res = []
  }
  let i = 1
  while (i < 3) {
    if (n + i <= 10) {
      let _res = res.slice()
      _res.push(i)
      if (n+i === 10) {
        console.log(_res)
      } else {
        step(n + i, _res)
      }
    }
    i++
  }
}
step(0)
