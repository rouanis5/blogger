import Swal from "sweetalert2";

function sweetAlert(message = "", type = "error", btnText = "") {
  switch (type) {
    case "success":
      return Swal.fire({
        position: "center",
        icon: "success",
        title: message,
        showConfirmButton: false,
        timer: 1500,
      });
    case "error":
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        html: message,
        confirmButtonColor: "#dc3545",
      });
    case "warning":
      return Swal.fire({
        title: "Are you sure?",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: btnText,
      });
    default:
      sweetAlert("Wrong type");
      break;
  }
}

export { sweetAlert };
