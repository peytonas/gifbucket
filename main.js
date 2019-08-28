import GifController from "./gifbucket/Controllers/GifController.js"

class App {
  constructor() {
    this.controllers = {
      gifController: new GifController()
    }
  }
}

window["app"] = new App()