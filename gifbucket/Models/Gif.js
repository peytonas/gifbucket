export default class Gif {
  constructor(data) {
    this._id = data._id || data.id
    this.title = data.title
    this.myUrl = data.myUrl || data.embed_url
  }

  generateImgClasses() {
    let classes = ""
    this.myUrl.forEach(i => classes += i.myUrl.name + " ")
    return classes
  }

  get Template() {
    return `
    <div class="card">
      <iframe src="${this.myUrl}" frameborder="0" class="card-img-top"></iframe>
      <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <button class="btn btn-success" onclick="app.controllers.gifController.selectGif()">Select</button>
        <button class="btn btn-warning" onclick="app.controllers.gifController.addGif()">Add Gif</button>

        ${this._id ? `<button class="btn btn-danger" onclick="app.controllers.gifController.removeGif()">Re-Gif-t</button>` : ""}
      </div>
    </div>
  `
  }






}
