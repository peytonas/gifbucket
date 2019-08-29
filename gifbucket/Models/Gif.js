export default class Gif {
  constructor(data) {
    this._id = data._id || data.id
    this.title = data.title
    this.myUrl = data.myUrl || data.embed_url
  }

  get Template() {
    return `
    <div class="card text-white bg-primary mb-3">
      <iframe class="card-header" src="${this.myUrl}" frameborder="0" class="card-img-top"></iframe>
      <div class="card-body">
        <h5 class="card-title">${this.title}</h5>
        <button class="btn btn-success" onclick="app.controllers.gifController.select()">Select</button>
        <button class="btn btn-warning" onclick="app.controllers.gifController.addGif()">Add GIF</button>

        ${this._id ? `<button class="btn btn-danger" onclick="app.controllers.gifController.removeGif()">Re-GIF-t</button>` : ""}
      </div>
    </div>
  `
  }






}
