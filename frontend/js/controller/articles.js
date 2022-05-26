import API_URL from "../config/env";
import Article from "../view/articleCard";
import View from "../helpers/abstractView";
import axios from "axios";

const url = new URL(API_URL + "/get/all");

export default class displayArticles extends View {
  // html;
  constructor() {
    super();
  }

  async getHtml() {
    const params = new URLSearchParams({
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
      res.message.forEach((el) => {
        var comp = new Article(el.id, el.post, el.date_post);
        html += `<div class='col-lg-3 col-md-6'>${comp.getHtml()}</div>`;
      });
    }
    return html;
  }
}
