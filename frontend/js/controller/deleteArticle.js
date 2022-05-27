import Post from "../model/post";
import objectAlert from "../helpers/functions";

export default class deleteArticle {
  constructor(id) {
    this.id = id;
  }

  async send() {
    var post = new Post();
    var res = await post.delete(this.id);
    objectAlert(res, "article deleted seccessfully !");

    return res.success;
  }
}
