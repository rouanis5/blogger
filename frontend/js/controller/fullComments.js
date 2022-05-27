import comment from "../model/comment";
import CommentCard from "../view/commentCard";
import CommentsSection from "../view/commentsSection";
import View from "../helpers/abstractView";

var c = new comment();

export default class fullComments extends View{
  constructor(postId){
    super();
    this.postId = postId;
  }

  async getCommentsStyle() {
    var html = "";
    var res = await c.getAll(this.postId);

    if (res.success) {
      res.message.forEach((el) => {
        var comp = new CommentCard(el.id, el.author, el.comment, el.date_comment);
        html += comp.getHtml();
      });
    }
    return html;
  }

  async getHtml(){
    var html = await this.getCommentsStyle();
    var comp = new CommentsSection(this.postId, html);
    return comp.getHtml();
  }
}