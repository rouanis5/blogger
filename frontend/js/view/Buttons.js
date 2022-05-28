import View from "../helpers/abstractView";

export default class Buttons extends View {
  constructor(id, action){
    super();
    this.id = id;
    this.action = action;
  }

  getHtml() {
    return `
      <btn class="btn btn-primary update-${this.action}-btn" data-id="${this.id}" title="update this article">
        <i class="bi bi-pencil remove-pointer-events"></i>
      </btn>
      <btn class="btn btn-danger delete-${this.action}-btn" data-id="${this.id}" title="delete this article">
        <i class="bi bi-trash3 remove-pointer-events"></i>
      </btn>
    `;
  }
}
