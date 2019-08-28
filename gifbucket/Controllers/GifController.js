import GifService from "../Services/GifService.js"

let _gifService = new GifService()

function _drawApiGif() {
  let gif = _gifService.ApiGif
  let template = "<ol>"
  gif.forEach(g => {
    template += `<li onclick="app.controllers.gifController.getOne("${g.name}")">${g.name}</li>`
  })
  document.getElementById("api-gif").innerHTML = template + "</ol>"
}
function _drawCurrentGif() {
  document.getElementById("api-gif").innerHTML = _gifService.CurrentGif.Template
}
function _drawMyGif() {
  let gif = _gifService.MyGif
  let template = "<ol>"
  gif.forEach(g => {
    template += `<li onclick="app.controllers.gifController.setOne('${g._id}')">${g.title}</li>`
  })
  document.getElementById('my-gif').innerHTML = template + "</ol>"
}

export default class GifController {
  constructor() {
    _gifService.addSubscriber("apiGif", _drawApiGif)
    _gifService.addSubscriber("currentGif", _drawCurrentGif)
    _gifService.addSubscriber("myGif", _drawMyGif)

    _gifService.getAllApi()
    _gifService.getMyGif()
  }
  getOne(title) {
    _gifService.getOne(title)
  }
  setOne(id) {
    _gifService.setOne(id)
  }
  addGif() {
    _gifService.add()
  }
  removeGif() {
    _gifService.removeGif()
    document.getElementById("current-gif").innerHTML = ""
  }
}