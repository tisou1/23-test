function Bitwise(a, b) {
  return b ^ ((a ^ b) & -(a < b))
}

// 示例用法
console.log(Bitwise(5, 10)) // 输出: 10
console.log(Bitwise(-2, -5)) // 输出: -2
console.log(Bitwise(7, 7)) // 输出: 7
