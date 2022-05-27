import sweetAlert from "../config/swal";
import comment from "../model/comment";


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

    if (res.success) {
      sweetAlert("comment added seccessfully !", "success");
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
