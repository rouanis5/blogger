import View from "./abstractView";

export default class Article extends View {
  constructor(id = "", desc = "", date = "") {
    super();
    this.id = id;
    this.desc = desc;
    this.date = date;
  }

  getHtml() {
    return `
    <section id="article" class="my-5">
      <div class="container">
        <h2 class="h1 text-success fw-bold text-center text-uppercase mb-3">
          Article number ${this.id}
        </h2>
        <h3 class="h6 text-muted text-center mt-1">Published: ${this.date}</h3>
        <img
          class="img-thumbnail mx-auto d-block"
          src="https://picsum.photos/1000/600?random=1"
          alt="image"
        />
        <p class="text-black mt-5 h5 fw-light lh-base">${this.desc}</p>
      </div>
    </section>
    `;
  }
}
