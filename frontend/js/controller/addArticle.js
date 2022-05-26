import sweetAlert from "../config/swal";
import Post from "../model/post";


export default class addArticle {
  constructor(text, date = null) {
    this.text = text;
    this.date = date;
  }

  async send() {
    var post = new Post();
    var res = await post.add(this.text, this.date);

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
