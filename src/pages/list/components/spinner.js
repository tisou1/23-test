class Spinner {
  constructor(message = '') {
    this.message = message
    this.spinners = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    this.intervalId = null
  }

  message(message) {
    this.message = message
    return this
  }

  start() {
    let i = 0
    this.intervalId = setInterval(() => {
      process.stdout.write(`\r${this.spinners[i]} ${this.message}`)
      i = (i + 1) % this.spinners.length
    }, 100)
  }

  stop() {
    clearInterval(this.intervalId)
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
  }

  succeed() {
    this.stop()
    console.log(`\r✔ ${this.message}`)
  }

  fail() {
    this.stop()
    console.log(`\r× ${this.message}`)
  }
}

const spinner = new Spinner('加载中...')

spinner.start()

setTimeout(() => {
  spinner.succeed()
}, 5000)
