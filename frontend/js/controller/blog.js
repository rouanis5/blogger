//this file show all artilces in the same section
import Post from "../model/post";
import Article from "../view/articleCard";
import View from "../helpers/abstractView";

export default class Blog extends View {
  // html;
  constructor() {
    super();
  }
  
  async getHtml() {
    var post = new Post();
    var html = "";
    var res = await post.getAll();

    if (res.success) {
      res.message.forEach((el) => {
        var comp = new Article(el.id, el.post, el.date_post);
        html += `<div class='col-lg-3 col-md-6'>${comp.getHtml()}</div>`;
      });
    }
    return html;
  }
}
