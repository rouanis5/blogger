import View from "../helpers/abstractView";
const bgImgUrl = new URL('../../images/background/3.jpg',import.meta.url).href
const errorImgUrl = new URL('../../images/404.svg',import.meta.url).href

export default class NotFoundPage extends View {
  getHtml() {
    return `
    <section class="welcom min-vh-100 py-5 d-flex justify-content-center align-items-center custom-img-article custom-img-cover"
    style="--img-src: url('${bgImgUrl}')">
        <a class="d-none" href="https://storyset.com/web">Web illustrations by Storyset</a>
        <div class="container">
          <div class="error bg-white p-5 rounded text-center mx-auto">
              <img class="custom-img-error" src="${errorImgUrl}" alt="error 404 page not found"></img>
              <div class="my-4">
                <h2 class="h2">Page Not Found</h2>
                <p class="h5 fw-light">Sorry, an error has occured !</p>
              </div>
              <a href='/#' class="scrollToBtn btn main-btn btn-outline-warning btn-lg fw-bosld rounded">Go Back</a>
          </div>
        </div>
    </section>
    `;
  }
}
