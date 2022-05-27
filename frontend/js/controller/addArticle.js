import objectAlert from "../helpers/functions";
import Post from "../model/post";


export default class addArticle {
  constructor(text, date = null) {
    this.text = text;
    this.date = date;
  }

  async send() {
    var post = new Post();
    var res = await post.add(this.text, this.date);
    objectAlert(res, "article added seccessfully !");

    return res.success;
  }
}
