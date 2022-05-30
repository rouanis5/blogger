//this file show all artilces in the same section
import Post from "../model/post";
import Article from "../view/articleCard";
import Welcom from "../view/welcom";
import View from "../helpers/abstractView";

export default class Blog extends View {
  // html;
  constructor() {
    super();
  }
  
  async getHtml() {
    var welcom = new Welcom();
    var post = new Post();
    var html = welcom.getHtml();
    var res = await post.getAll();

    if (res.success) {
      var cards = "";
      res.message.forEach((el) => {
        var comp = new Article(el.id, el.post, el.date_post);
        cards += `<div class='col-lg-3 col-md-6'>${comp.getHtml()}</div>`;
      });
      html +=  `<div id='articles' class='my-5'><div class='container'><div class='row g-4'>${cards}</div></div></div>`;
    }
    return html;
  }
}
