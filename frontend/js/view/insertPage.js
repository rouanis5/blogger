import View from "../helpers/abstractView";

export default class AddPage extends View {
  constructor(btnText = '', btnId = '',id='', textarea = ''){
    super();
    this.btnText = btnText;
    this.btnId = btnId;
    this.id = id;
    this.textarea = textarea;
  }
  getHtml() {
    return `
    <section id="addform" class="my-5">
      <div class="container">
        <h2 class="h1 text-warning fw-bold text-center text-uppercase my-4">
          ${this.btnText} Article ${this.id}
        </h2>
        <form action="">
          <div class="mb-3">
            <label for="textarea" class="form-label">Enter your paragraph</label>
            <textarea
              class="form-control"
              id="textarea"
              rows="15"
              data-id="${this.id}">
              ${this.textarea}
            </textarea>
          </div>
          <p class="mb-3 text-muted h6 fw-light">
            <b class="fw-bold mb-">Notes:</b>
            <br>1. We will publish it at the current time
            <br>2. You can edit at any time
          </p>
          <div class="d-flex justify-content-end gap-2">
            <button class="py-2 btn btn-warning" type="reset">Reset</button>
            <button id="${this.btnId}" class="py-2 btn btn-success" type="submit">${this.btnText}</button>
          </div>
        </form>
      </div>
    </section>
   `;
  }
}
