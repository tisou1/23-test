class A {
  constructor(props) {
    console.log(props, '类A')
  }

  getName() {
    return '类A的getName'
  }
}

class B extends A {
  constructor(props) {
    super({ ...props, su: 'cc' })
    console.log(props, '类B 构造函数')
  }
}

const b = new B({ name: 'cc', age: 18 })
