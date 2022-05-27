import Post from "../model/post";
import Comment from "../model/comment";
import objectAlert from "../helpers/functions";
import commentUpdateCard from "../view/commentUpdateCard";


export default class updateComment {
  constructor(id, author = null, text = null, date = null) {
    this.id = id;
    this.author = author;
    this.text = text;
    this.date = date;
  }

  async getHtml() {
    var c = new Comment();
    var res = await c.get(this.id);
    
    var html = "";
    
    if (res.success) {
      var el = res.message;
      var comp = new commentUpdateCard(el.id, el.author, el.comment, el.date_comment)
      html = comp.getHtml();
    }
    return html;
  }

  async send() {
    var c = new Comment();
    var res = await c.update(this.id,this.author, this.text, this.date);
    objectAlert(res, "comment updated seccessfully !");

    return res.success;
  }
}
