import sweetAlert from "../config/swal";
import comment from "../model/comment";


export default class deleteComment {
  constructor(id) {
    this.id = id;
  }

  async send() {
    var c = new comment();
    var res = await c.delete(this.id);

    if (res.success) {
      sweetAlert("comment deleted seccessfully !", "success");
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
