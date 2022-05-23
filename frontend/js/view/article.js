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
    var desc = string.substring(0, 150) + "...";
    return `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Article ${this.id}</h5>
          <p class="card-text">${desc}</p>
          <p class="card-text">
            <small class="text-muted">Date: ${this.date}</small>
          </p>
          <a href="?action=post&id=${this.id}" class="btn btn-success">Read more</a>
        </div>
      </div>
    `;
  }
}
