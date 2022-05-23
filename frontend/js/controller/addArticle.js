import API_URL from "../config/env";
import sweetAlert from "../config/swal";
import axios from "axios";

const url = new URL(API_URL + "/add");

export default class addArticle {
  constructor(text, date = null) {
    this.text = text;
    if (!date) {
      this.date = date;
    }
    this.date = new Date().toISOString().slice(0, 10);
  }

  async send() {
    const params = new URLSearchParams({
      action: "post",
      text: this.text || "",
      date: this.date || "",
    });

    var res;
    try {
      var req = await axios.post(url, params);
      res = req.data;
    } catch (error) {
      res = { success: false, message: "axios failure" };
    }

    if (res.success) {
      sweetAlert("article added seccessfully !", "success");
    } else {
      var errors = res.message;
      var html = "";
      errors.forEach((error) => {
        html += `<div class="alert alert-danger" role="alert">${error}</div>`;
      });
      sweetAlert(html);
    }

    return res.success;
  }
}
