import Render from "./controller/render";
import sweeetAlert from "./config/swal";

window.addEventListener("load", async function () {
  const init = new Render();
  init.init();
  route();
});

// block urls
document.addEventListener("click", (e) => {
  if (e.target.matches("a")) {
    e.preventDefault();
    navigateTo(e.target.href);
  }
});

document.addEventListener("click", async (e) => {
  if (e.target.matches("#addBtn")) {
    e.preventDefault();
    var render = new Render();
    var res = await render.addArticle();
    if (res) {
      navigateTo();
    }
  }
});

const navigateTo = (url = "?action") => {
  if (url) {
    history.pushState(null, null, url);
  }
  route();
};

async function route() {
  const querry = window.location.search;
  const urlParams = new URLSearchParams(querry);
  const action = urlParams.get("action") || "";
  const id = urlParams.get("id");
  var render = new Render();

  switch (action) {
    case "post":
      await render.getArticle(id);
      break;
    case "add":
      render.getAddPage();
      break;

    case "":
      await render.getArticles();
      break;
    default:
      sweeetAlert("page Not found");
      navigateTo();
      break;
  }
}
