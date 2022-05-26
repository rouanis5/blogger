import View from "../helpers/abstractView";

export default class ArticleButtons extends View {
  constructor(id){
    super();
    this.id = id;
  }
  getHtml() {
    return `
      <a href="?action=update&id=${this.id}" class="btn btn-primary" title="update this article">
        <i class="bi bi-pencil"></i>
      </a>
      <a href="/#" class="btn btn-danger delete-article-btn" data-id="${this.id}" title="delete this article">
        <i class="bi bi-trash3"></i>
      </a>
    `;
  }
}
