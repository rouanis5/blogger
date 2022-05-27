import Header from "./view/header";
import Footer from "./view/footer";
import displayArticle from "./controller/fullArticle";
import Blog from "./controller/blog";
import AddPage from "./view/insertPage";
import addArticle from "./controller/addArticle";
import updatePage from "./controller/updatePage";
import updateArticle from "./controller/updateArticle";
import deleteArticle from "./controller/deleteArticle";
import addComment from "./controller/addComment";
import fullComments from "./controller/fullComments";
import deleteComment from "./controller/deleteComment";
import sweetAlert from "./config/swal";

export default class Render {
  //render the header, main, footer
  init() {
    const app = document.getElementById("app");
    var header = new Header();
    var footer = new Footer();

    app.innerHTML = header.getHtml();
    app.innerHTML += "<main id='main'></main>";
    app.innerHTML += footer.getHtml();
  }

  async getArticles() {
    var articles = new Blog();
    await articles.getHtml().then((res) => {
      document.getElementById(
        "main"
      ).innerHTML = `<div id='articles' class='my-5'><div class='container'><div class='row g-4'>${res}</div></div></div>`;
    });
  }

  async getArticle(id) {
    var article = new displayArticle(id);
    await article.getHtml().then((res) => {
      document.getElementById("main").innerHTML = res;
    });
  }

  getAddPage() {
    var page = new AddPage('Insert','addBtn');
    document.getElementById("main").innerHTML = page.getHtml();
  }
  
  async addArticle() {
    var data = new addArticle(document.getElementById("textarea").value);
    var res = await data.send();
    return res;
  }

  async updateArticle() {
    var textarea = document.getElementById("textarea");
    var data = new updateArticle(textarea.getAttribute('data-id'), textarea.value);
    var res = await data.send();
    return res;
  }

  async deleteArticle(id) {
    var data = new deleteArticle(id);
    sweetAlert('You won\'t be able to revert this!','warning','Yes, delete it!')
    .then(async (btn)=>{
      if (btn.isConfirmed) {
        var res = await data.send();
      }
    })
    return res || false;
  }
  
  async updatePage(id){
    var data = new updatePage(id);
    await data.getHtml().then((res) => {
      document.getElementById("main").innerHTML = res;
    });
  }

  async addComment(postId) {
    var textarea = document.getElementById("commentText");
    var authorarea = document.getElementById("commentAuthor");

    var data = new addComment(postId, authorarea.value, textarea.value);
    var res = await data.send();
    if (res) {
      var html = new fullComments(postId);
      document.getElementById("comments").innerHTML = await html.getCommentsStyle();
    }
  }

  async deleteComment(id) {
    var data = new deleteComment(id) ;
    sweetAlert('You won\'t be able to revert this!','warning','Yes, delete it!')
    .then(async (btn)=>{
      if (btn.isConfirmed) {
        var res = await data.send();
        if (res) {
          var postId = document.getElementById("add-comment-btn").getAttribute('data-post-id');
          var html = new fullComments(postId);
          document.getElementById("comments").innerHTML = await html.getCommentsStyle();
        }
      }
    })
    return res || false;
  }

}
