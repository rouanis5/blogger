import View from "../helpers/abstractView";

export default class Footer extends View {
  getHtml() {
    return `
      <footer>
          <div class="container my-4 text-center">
              <span class="h6">© 2022 Copyright - </span>
              <a class="h6 ms-auto text-reset"href="https://github.com/rouanis5/"> IDJA Mohamed Ouanis</a>
          </div>
      </footer>
    `;
  }
}
