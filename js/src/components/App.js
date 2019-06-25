class App {
  init() {
    const boop = (() => { return 1+10 })()
    console.log("init great?", boop)
  }
}

export default new App
