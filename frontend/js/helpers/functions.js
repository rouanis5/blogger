import sweetAlert from "../config/swal";
//this function get an object that conatains a boolean and a array of messages
//it checks them then it popups response

function objectAlert(res = {success: true, message: []} , message = "please insert a text"){
  if (res.success) {
    sweetAlert(message, 'success');
    return;
  }

  var errors = res.message;
  var html = "";
  errors.forEach((error) => {
    html += `<div class="alert alert-danger" role="alert">${error}</div>`;
  });
  sweetAlert(html);
}

export default objectAlert;