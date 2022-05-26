import sweetAlert from "../config/swal";
import Post from "../model/post";


export default class deleteArticle {
  constructor(id) {
    this.id = id;
  }

  async send() {
    var post = new Post();
    var res = await post.delete(this.id);

    if (res.success) {
      sweetAlert("article deleted seccessfully !", "success");
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
