import Render from "./render";
import sweeetAlert from "./config/swal";

//I should search about:
// 1. defference between load & DOMContentLoaded
// 2. defference between document & window and its events
// 3. what is popstate exactly
document.addEventListener("DOMContentLoaded", async function () {
  const init = new Render();
  init.init();
  route();
});

//when you click back btn, forward .. it will run route()
window.addEventListener("popstate", () => {
  route();
});

// block urls
document.addEventListener("click", (e) => {
  //prevent clicks and route when you click a hyperlick and its children
  if ( e.target.matches("a")) {
    e.preventDefault();
    navigateTo(e.target.href);
  }

  if ( e.target.matches(".update-article-btn")) {
    e.preventDefault();
    var id = e.target.getAttribute("data-id");
    navigateTo(`/?action=update&id=${id}`);
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

  if (e.target.matches("#updateBtn")) {
    e.preventDefault();
    var render = new Render();
    var res = await render.updateArticle();
    if (res) {
      navigateTo();
    }
  }
  
  if (e.target.matches(".delete-article-btn")) {
    e.preventDefault();
    var render = new Render();
    var res = await render.deleteArticle(e.target.getAttribute("data-id"));
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
    case "update":
      render.updatePage(id);
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
