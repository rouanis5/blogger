import View from "../helpers/abstractView";
import Buttons from "./Buttons";

export default class ArticleCard extends View {
  constructor(id = "", desc = "", date = "") {
    super();
    this.id = id;
    this.desc = desc;
    this.date = date;

    this.btns = new Buttons(this.id, 'article');
  }

  getHtml() {
    var string = this.desc;
    var random = Math.floor(Math.random() * 100);
    var desc = string.substring(0, 150) + "...";
    return `
      <div class="card">
        <img
          class="card-img-top"
          src="https://picsum.photos/514/200?random=${random}"
          alt="image-post-${this.id}"
          height='200px' 
        />
        <div class="card-body">
          <h5 class="card-title">Article ${this.id}</h5>
          <p class="card-text">${desc}</p>
          <p class="card-text">
            <small class="text-muted">Date: ${this.date}</small>
          </p>
          <div class="d-flex gap-1 mt-4">
            <div>${this.btns.getHtml()}</div>
            <a href="?action=post&id=${this.id}" class="btn btn-success btn-sm ms-auto">Read more</a>
          </div>
        </div>
      </div>
    `;
  }
}
