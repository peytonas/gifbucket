export default class Gif {
  constructor(data) {
    this._id = data._id
    this.title = data.title
    this.img = data.img
  }

  //FIXME do I even need this generate function?
  generateImgClasses() {
    let classes = ""
    this.img.forEach(i => classes += i.img.name + " ")
    return classes
  }

  get Template() {
    return `
    <div class="card ${this.generateImgClasses()}">
      <iframe src="${this.img}" frameborder="0" class="card-img-top"></iframe>
      <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <button class="btn btn-warning" onclick="app.controllers.gifController.addGif()">Add Gif</button>

        ${this._id ? `<button class="btn btn-danger" onclick="app.controllers.gifController.removeGif()">Re-Gif-t</button>` : ""}
      </div>
    </div>
  `
  }






}
