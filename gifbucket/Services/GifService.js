import Gif from "../Models/Gif.js"

// @ts-ignore
let _gifApi = axios.create({
  baseURL: "//api.giphy.com/v1/gifs/trending?api_key=LeMW5S9F7C5VAIirqbA4nWJTV0TQBART"
})


// @ts-ignore
let _sandbox = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/api/peyton/gifs"
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
    return _state.apiGif
  }
  get CurrentGif() {
    return new Gif(_state.currentGif)
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
        _setState("apiGif", res.data.data)
        console.log(res.data.data)
      })
      .catch(err => console.error(err))
  }
  getOne(name) {
    _gifApi.get(name)
      .then(res => {
        let giphy = new Gif(res.data)
        _setState("currentGif", giphy)
        console.log(giphy);
      })
      .catch(err => console.error(err))
  }
  getMyGif() {
    _sandbox.get()
      .then(res => {
        let data = res.data.data.map(g => new Gif(g))
        _setState("myGif", data)
        console.log(data)
      })
      .catch(err => console.error(err))
  }

  add() {
    _sandbox.post("", _state.currentGif)
      .then(res => {
        _state.myGif.push(new Gif(res.data.data))
        _setState("myGif", _state.myGif)
      })
      .catch(err => console.error(err))
  }

  //TODO removeGif function here








}





