import Model from "../helpers/model";

export default class Post extends Model{
  constructor(){
    super();
    this.action = "post";
  }

  async getAll(){
    const url = this.getURL("/get/all");
    const params = this.setParams();

    return await this.connect(url, params);
  }

  async get(id) {
    const url = this.getURL("/get");
    const params = this.setParams({
      id: id,
    });

    return await this.connect(url, params);
  }

  async add(text, date = null){
    if (!date) {
      date = new Date().toISOString().slice(0, 10);
    }

    const url = this.getURL("/add");
    const params = this.setParams({
      text: text || "",
      date: date || "",
    });

    return await this.connect(url, params);
  }

  async update(id, text, date = null){
    if (!date) {
      date = new Date().toISOString().slice(0, 10);
    }

    const url = this.getURL("/update");
    const params = this.setParams({
      id: id || "",
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