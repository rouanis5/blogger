import Comment from "../model/comment";
import View from "../helpers/abstractView";
import CommentCard from "../view/commentCard";


export default class getComment extends View{
  constructor(id) {
    super()
    this.id = id;
  }

  async getHtml() {
    var c = new Comment();
    var res = await c.get(this.id);
    
    var html = "";
    
    if (res.success) {
      var el = res.message;
      var comp = new CommentCard(el.id, el.author, el.comment, el.date_comment)
      html = comp.getHtml();
    }
    return html;
  }
}
