import Post from '../model/post';
import View from "../helpers/abstractView";
import AddPage from "../view/insertPage";

export default class updatePage extends View {
  constructor(id) {
    super();
    this.id = id;
  }

  async getHtml() {
    var post = new Post();
    var res = await post.get(this.id);
    var html = "";

    if (res.success) {
      var page = new AddPage('Update','updateBtn', res.message.id, res.message.post);
      html = page.getHtml();
    }
    return html;
  }
}
