import View from "./abstractView";

export default class AddPage extends View {
  getHtml() {
    return `
    <section id="add" class="my-5">
      <div class="container">
        <form action="">
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Enter your paragraph</label>
            <textarea
              class="form-control"
              id="text"
              rows="3">
            </textarea>
          </div>
          <div class="d-flex">
            <a href="?action=addArticle" class="btn btn-success w-100">Insert</a>
          </div>
        </form>
      </div>
    </section>
   `;
  }
}
