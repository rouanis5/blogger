import comment from "../model/comment";
import objectAlert from "../helpers/functions";


export default class deleteComment {
  constructor(id) {
    this.id = id;
  }

  async send() {
    var c = new comment();
    var res = await c.delete(this.id);
    objectAlert(res, "comment deleted seccessfully !",);

    return res.success;
  }
}
