function add(...arg1) {
  const adder = (...arg2) => {
    const args = [...arg1, ...arg2]

    return adder(args)
  }

  adder.toString = function () {
    return arg1.reduce((prev, next) => {
      return prev + next
    }, 0)
  }

  return adder
}

export default add
