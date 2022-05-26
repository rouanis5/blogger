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
          <div class="d-flex">
            <button id="${this.btnId}" class="btn btn-success w-100" type="submit">${this.btnText}</button>
          </div>
        </form>
      </div>
    </section>
   `;
  }
}
