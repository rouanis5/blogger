import API_URL from "../config/env";
import Article from "../view/articlePage";
import View from "../view/abstractView";
import axios from "axios";

const url = new URL(API_URL + "/get");

export default class displayArticle extends View {
  // html;
  constructor(id) {
    super();
    this.id = id;
  }

  async getHtml() {
    const params = new URLSearchParams({
      id: this.id,
      action: "post",
    });

    var res;
    var html = "";
    try {
      var req = await axios.post(url, params);
      res = req.data;
    } catch (error) {
      res = { success: false, message: "axios failure" };
    }

    if (res.success) {
      var el = res.message;
      var comp = new Article(el.id, el.post, el.date_post);
      html = comp.getHtml();
    }
    return html;
  }
}
