import comment from "../model/comment";
import objectAlert from "../helpers/functions";


export default class addComment {
  constructor(postId, author, text, date = null) {
    this.postId = postId;
    this.author = author;
    this.text = text;
    this.date = date;
  }

  async send() {
    var c = new comment();
    var res = await c.add(this.postId,this.author,this.text, this.date);
    objectAlert(res, "comment added seccessfully !");

    return res.success;
  }
}
