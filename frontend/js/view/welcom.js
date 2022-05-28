import View from "../helpers/abstractView";
const imgUrl = new URL('../../images/background/1.jpg',import.meta.url).href

export default class Welcom extends View {
  getHtml() {
    return `
    <section class="welcom min-vh-100 py-5 d-flex justify-content-center align-items-center custom-img-article custom-img-cover"
    style="--img-src: url('${imgUrl}')">
        <div class="container">
            <div class="text-center">
                <h1 class="h1 text-white">IDJA Mohamed Ouanis</h1>
                <p class="h6 text-white fw-light">everyday an article about nature </p>
                <btn data-href='#articles' class="scrollToBtn btn main-btn btn-warning btn-lg fw-bosld rounded mt-4">Get Started</btn>
            </div>
        </div>
    </section>
    `;
  }
}
