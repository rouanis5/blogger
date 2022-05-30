import View from "../helpers/abstractView";
import comment from "../model/comment";
import CommentCard from "../view/commentCard";

export default class getLastComment extends View{
  constructor(postId){
    super();
    this.postId = postId;
  }

  async getHtml(){
    var c = new comment();
    var res = await c.getLast(this.postId);
    
    var html = "";
    
    if (res.success) {
      var el = res.message;
      var comp = new CommentCard(el.id, el.author, el.comment, el.date_comment)
      html = comp.getHtml();
    }
    return html;
  }
}