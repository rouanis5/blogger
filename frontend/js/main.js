import Render from "./render";

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

  //exemple: when you click on get started btn, he will scroll you articles section
  if ( e.target.matches(".scrollToBtn")) {
    e.preventDefault();
    var el = e.target.getAttribute('data-href')
    document.querySelector(el).scrollIntoView()
  }

  //when you cancel the update operation,then you will restore your comment
  if ( e.target.matches("#cancel-update-comment-btn")) {
    e.preventDefault();
    var id = e.target.getAttribute('data-id');
    var render = new Render();
    render.unsetCommentUpdateCard(id);
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

  if (e.target.matches("#add-comment-btn")) {
    e.preventDefault();
    var render = new Render();
    await render.addComment(e.target.getAttribute('data-post-id'));
  }

  if (e.target.matches(".delete-comment-btn")) {
    e.preventDefault();
    var render = new Render();
    await render.deleteComment(e.target.getAttribute('data-id'));
  }

  if (e.target.matches(".update-comment-btn")) {
    e.preventDefault();
    var render = new Render();
    var res = render.getCommentUpdateCard(e.target.getAttribute('data-id'));
    e.target.innerHtml = res;
  }

  if (e.target.matches("#submit-update-comment-btn")) {
    e.preventDefault();
    var render = new Render();
    await render.updateComment(e.target.getAttribute('data-id'));
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
      if (! await render.getArticle(id)){
        navigateTo('?action=404');
      }
      break;
    case "add":
      render.getAddPage();
      break;
    case "update":
      if (! await render.updatePage(id)){
        navigateTo('?action=404');
      }
      break;
    case "":
      await render.getArticles();
      break;
    case "404":
      render.getNotFoundPage();
      break;
    default:
      navigateTo('?action=404');
      break;
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
  })
}
