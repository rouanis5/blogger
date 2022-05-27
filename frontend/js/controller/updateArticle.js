import Post from "../model/post";
import objectAlert from "../helpers/functions";


export default class updateArticle {
  constructor(id, text, date = null) {
    this.id = id;
    this.text = text;
    this.date = date;
  }

  async send() {
    var post = new Post();
    var res = await post.update(this.id, this.text, this.date);

    objectAlert(res, "article updated seccessfully !");

    return res.success;
  }
}
