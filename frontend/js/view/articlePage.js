import View from "../helpers/abstractView";
import Buttons from "./Buttons";
import fullComments from "../controller/fullComments";

export default class articlePage extends View {
  constructor(id = "", desc = "", date = "") {
    super();
    this.id = id;
    this.desc = desc;
    this.date = date;

    this.btns = new Buttons(this.id, 'article');
  }

  async getHtml() {
    var section = new fullComments(this.id);
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
      </div>
      <div class="custom-img-cover custom-img-article" style="--img-src: url('https://picsum.photos/1200/300?random=1')"></div>
      <div class="container">
        <p class="text-black mt-5 lh-base px-2">${this.desc}</p>
        <div class="d-flex">
          <a href="/#" class="btn btn-success ms-auto me-5">
            <i class="bi bi-arrow-return-left me-2"></i>
            Go back
          </a>
        </div>
      </div>
    </section>
    ${await section.getHtml()}
    `;
  }
}
