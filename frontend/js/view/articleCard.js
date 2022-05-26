import View from "./abstractView";

export default class Article extends View {
  constructor(id = "", desc = "", date = "") {
    super();
    this.id = id;
    this.desc = desc;
    this.date = date;
  }

  getHtml() {
    var string = this.desc;
    var random = Math.floor(Math.random() * 100);
    var desc = string.substring(0, 150) + "...";
    return `
      <div class="card">
        <img
          class="card-img-top"
          src="https://picsum.photos/200/120?random=${random}"
          alt="image"
          height='200px' 
        />
        <div class="card-body">
          <h5 class="card-title">Article ${this.id}</h5>
          <p class="card-text">${desc}</p>
          <p class="card-text">
            <small class="text-muted">Date: ${this.date}</small>
          </p>
          <div class="d-flex gap-1">
            <a href="?action=post&id=${this.id}" class="btn btn-success me-auto">Read more</a>
            <a href="?action=update&id=${this.id}" class="btn btn-primary" title="update this article">
              <i class="bi bi-pencil"></i>
            </a>
            <a href="/#" class="btn btn-danger" title="delete this article">
              <i class="bi bi-trash3"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }
}
