import axios from "axios";
import API_URL from "../config/env";

export default class Model {
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

  getURL(urlPrefix){
    //should start with slash and don't end with it ! 
    return new URL(API_URL + urlPrefix);
  }

  setParams(paramsObj = {} /* it should be an object*/){
    return new URLSearchParams({...{
      action: this.action,
    }, ...paramsObj});
  }
}