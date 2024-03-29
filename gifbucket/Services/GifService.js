import Gif from "../Models/Gif.js"

// @ts-ignore
let _gifApi = axios.create({
  baseURL: "//api.giphy.com/v1/gifs/trending?api_key=LeMW5S9F7C5VAIirqbA4nWJTV0TQBART"
})


// @ts-ignore
let _sandBox = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/peyton/gifs"
})

let _state = {
  myGif: [],
  apiGif: [],
  currentGif: {}
}

let _subscribers = {
  myGif: [],
  apiGif: [],
  currentGif: []
}

function _setState(propName, data) {
  _state[propName] = data
  _subscribers[propName].forEach(fn => fn())
}
export default class GifService {
  get MyGif() {
    return _state.myGif.map(g => new Gif(g))
  }
  get ApiGif() {
    return _state.apiGif.map(g => new Gif(g))
  }
  get CurrentGif() {
    return new Gif(_state.currentGif)
  }
  select(id) {
    _gifApi.get(id)
      .then(res => {
        console.log(res.data);
        _setState("currentGif", new Gif(res.data))
      })
  }
  addSubscriber(propName, fn) {
    _subscribers[propName].push(fn)
  }
  setOne(id) {
    let giphy = _state.myGif.find(g => g._id == id)
    _setState("currentGif", giphy)
  }
  getAllApi() {
    _gifApi.get()
      .then(res => {
        console.log(res.data.data)
        _setState("apiGif", res.data.data)
      })
      .catch(err => console.error(err))
  }
  getOne(title) {
    _gifApi.get(title)
      .then(res => {
        let giphy = new Gif(res.data)
        _setState("currentGif", giphy)
        console.log(giphy);
      })
      .catch(err => console.error(err))
  }
  getMyGif() {
    _sandBox.get()
      .then(res => {
        let data = res.data.data.map(g => new Gif(g))
        _setState("myGif", data)
        console.log(data)
      })
      .catch(err => console.error(err))
  }
  add() {
    _sandBox.post("", _state.currentGif)
      .then(res => {
        _state.myGif.push(new Gif(res.data.data))
        _setState("myGif", _state.myGif)
      })
      .catch(err => console.error(err))
  }
  removeGif() {
    _sandBox.delete(_state.currentGif._id)
      .then(res => {
        let index = _state.myGif.findIndex(g => g._id == _state.currentGif._id)
        _state.myGif.splice(index, 1)
        _setState("myGif", _state.myGif)
      })
  }
}





