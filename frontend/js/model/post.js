import axios from "axios";
import API_URL from "../config/env";

export default class Post {
  constructor(){
    this.action = "post";
  }
  async connect(url, params){
    var res;
    try {
      var req = await axios.post(url, params);
      res = req.data;
    } catch (error) {
      res = { success: false, message: "axios failure" };
    }
    return res;
  }

  async getAll(){
    const url = new URL(API_URL + "/get/all");
    const params = new URLSearchParams({
      action: this.action,
    });

    return await this.connect(url, params);
  }

  async get(id) {
    const url = new URL(API_URL + "/get");
    const params = new URLSearchParams({
      action: this.action,
      id: id,
    });

    return await this.connect(url, params);
  }

  async add(text, date = null){
    if (!date) {
      date = new Date().toISOString().slice(0, 10);
    }

    const url = new URL(API_URL + "/add");
    const params = new URLSearchParams({
      action: this.action,
      text: text || "",
      date: date || "",
    });

    return await this.connect(url, params);
  }

  async update(id, text, date = null){
    if (!date) {
      date = new Date().toISOString().slice(0, 10);
    }

    const url = new URL(API_URL + "/update");
    const params = new URLSearchParams({
      action: this.action,
      id: id || "",
      text: text || "",
      date: date || "",
    });

    return await this.connect(url, params);
  }

  async delete(id){
    const url = new URL(API_URL + "/delete");
    const params = new URLSearchParams({
      action: this.action,
      id: id || "",
    });

    return await this.connect(url, params);
  }
}