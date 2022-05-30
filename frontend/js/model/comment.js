import Model from "../helpers/model";

export default class comment extends Model{
  constructor(){
    super();
    this.action = "comment";
  }

  async getAll(post_id){
    const url = this.getURL("/get/all");
    const params = this.setParams({
      post_id: post_id || ""
    });

    return await this.connect(url, params);
  }

  async get(id) { //comment id, not the post id!
    const url = this.getURL("/get");
    const params = this.setParams({
      id: id || "",
    });

    return await this.connect(url, params);
  }

  async getLast(post_id){
    const url = this.getURL("/get/last");
    const params = this.setParams({
      post_id: post_id || ""
    });

    return await this.connect(url, params);
  }

  async add(post_id, author, text, date = null){
    if (!date) {
      date = new Date().toISOString().slice(0, 10);
    }

    const url = this.getURL("/add");
    const params = this.setParams({
      post_id: post_id || "",
      author: author || "",
      text: text || "",
      date: date || "",
    });

    return await this.connect(url, params);
  }

  async update(id, author, text, date = null){
    if (!date) {
      date = new Date().toISOString().slice(0, 10);
    }

    const url = this.getURL("/update");
    const params = this.setParams({
      id: id || "",
      author: author || "",
      text: text || "",
      date: date || "",
    });

    return await this.connect(url, params);
  }

  async delete(id){
    const url = this.getURL("/delete");
    const params = this.setParams({
      id: id || "",
    });

    return await this.connect(url, params);
  }
}