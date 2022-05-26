//this file show the artilce page with its details
import Post from "../model/post";
import Article from "../view/articlePage";
import View from "../helpers/abstractView";


export default class displayArticle extends View {
  constructor(id) {
    super();
    this.id = id;
  }

  async getHtml() {
    var post = new Post();
    var res = await post.get(this.id);

    var html = "";
    if (res.success) {
      var el = res.message;
      var comp = new Article(el.id, el.post, el.date_post);
      html = comp.getHtml();
    }
    return html;
  }
}
