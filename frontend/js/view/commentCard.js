import View from "../helpers/abstractView";
import Buttons from "./Buttons";

export default class CommentCard extends View {
  constructor(id = "", author="", text = "", date = "") {
    super();
    this.id = id;
    this.author = author;
    this.text = text;
    this.date = date;
    this.btns = new Buttons(this.id, 'comment');
  }

  getHtml() {
    //for late i want to convert the date to : 20 October, 2018
    return `
      <div class="bg-light border border-success rounded p-3 mt-4 text-justify">
        <div class="d-flex align-items-center gap-2">
          <img src="https://i.pravatar.cc/50" alt="" class="rounded-circle" width="40" height="40">
          <h4 class="m-0">${this.author}</h4>
        </div>
        <br>
        <p class="fw-light">${this.text}</p>
        <div class="d-flex gap-1 align-items-center justify-content-between">
          <span class="ms-2">- ${this.date}</span>
          <div>${this.btns.getHtml()}</div>
        </div>
      </div>
    `;
  }
}
