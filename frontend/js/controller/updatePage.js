import API_URL from "../config/env";
import View from "../helpers/abstractView";
import AddPage from "../view/insertPage";
import axios from "axios";

const url = new URL(API_URL + "/get");

export default class updatePage extends View {
  constructor(id) {
    super();
    this.id = id;
  }

  async getHtml() {
    //this is a model it get the info of an article
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
    
    // -------------------------------------------------------------------------

    if (res.success) {
      var page = new AddPage('Update','updateBtn', res.message.id, res.message.post);
      html = page.getHtml();
    }
    return html;
  }
}
