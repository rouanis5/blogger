import View from "../helpers/abstractView";

const imgUrl = new URL('../../images/profile.jpg', import.meta.url).href

export default class commentUpdateCard extends View {
  constructor(id = "", author="", text = "", date = "") {
    super();
    this.id = id;
    this.author = author;
    this.text = text;
    this.date = date;
  }

  getHtml() {
    return `
    <form>
      <div class="mb-3 d-flex align-items-center gap-2">
        <img src="${imgUrl}" alt="" title="change your name" class="rounded-circle" width="40" height="40">
        <input type="text" id="update-comment-author-${this.id}" title="change your name" class="form-control" value="${this.author}">
      </div>
      <div class="mb-3">
        <textarea id="update-comment-text-${this.id}" rows="5" class="form-control">${this.text}</textarea>
      </div>
      <div class="d-flex gap-1 align-items-center justify-content-between">
        <button id="submit-update-comment-btn" data-id="${this.id}" class="btn btn-success" type="submit" title='update now!'>Update</button>
        <div>
          <button class="btn btn-warning" type="reset">Reset</button>
          <button id="cancel-update-comment-btn" data-id="${this.id}" class="btn btn-danger" title="cancel update"><i class="bi bi-x remove-pointer-events"></i></button>
        </div>
      </div>
    </form>
    `;
  }
}
