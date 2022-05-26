import View from "../helpers/abstractView";
import ArticleButtons from "./ArticleButtons";


export default class articlePage extends View {
  constructor(id = "", desc = "", date = "") {
    super();
    this.id = id;
    this.desc = desc;
    this.date = date;

    this.btns = new ArticleButtons(this.id);
  }

  getHtml() {
    return `
    <section id="article" class="my-5">
      <div class="container">
        <h2 class="h1 text-success fw-bold text-center text-uppercase mb-3">
          Article number ${this.id}
        </h2>
        <h3 class="h6 text-muted text-center mt-1">Published: ${this.date}</h3>
        <div class="d-flex justify-content-center gap-1 my-4">
          ${this.btns.getHtml()}
        </div>
        <img
          class="img-thumbnail mx-auto d-block"
          src="https://picsum.photos/1000/600?random=1"
          alt="image" style='height: 600px'
        />
        <p class="text-black mt-5 lh-base px-2">${this.desc}</p>
      </div>
    </section>
    `;
  }
}
