import sweetAlert from "./swal";

export default function ajax(
  successFunction,
  url,
  sendData = null,
  method = "POST",
  async = true
) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, async);
  if (method === "POST") {
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  }
  xhr.send(sendData);

  xhr.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      successFunction(this);
    } else if (this.status === 404) {
      console.log("PHP file not found");
      sweetAlert("Sorry, something went wrong");
    }
  };
}
