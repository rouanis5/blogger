import View from "./abstractView";

export default class AddPage extends View {
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
              rows="3">
            </textarea>
          </div>
          <div class="d-flex">
            <button id="addBtn" class="btn btn-success w-100">Insert</button>
          </div>
        </form>
      </div>
    </section>
   `;
  }
}
