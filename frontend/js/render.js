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
import updateComment from "./controller/updateComment";
import NotFoundPage from "./view/NotFoundPage";
import getComment from "./controller/getComment";

const CommentCache = {};

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
    document.getElementById("main").innerHTML = await articles.getHtml(); 
  }

  async getArticle(id) {
    var article = new displayArticle(id);
    var res = await article.getHtml();

    document.getElementById("main").innerHTML = res;
    return res ? true : false; 
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
    var res = false;
    await sweetAlert('You won\'t be able to revert this!','warning','Yes, delete it!')
    .then(async (btn) => {
      if (btn.isConfirmed) {
        res = await data.send();
      }
    })
    return res;
  }
  
  async updatePage(id){
    var data = new updatePage(id);
    var res = await data.getHtml();

    document.getElementById("main").innerHTML = res;
    return res ? true : false; 
  }

  async addComment(postId) {
    var textarea = document.getElementById("commentText");
    var authorarea = document.getElementById("commentAuthor");

    var data = new addComment(postId, authorarea.value, textarea.value);
    var res = await data.send();
    if (res) {
      this.refreshComments();
      textarea.value = "";
      authorarea.value = "";
    }
  }

  async deleteComment(id) {
    var data = new deleteComment(id) ;
    await sweetAlert('You won\'t be able to revert this!','warning','Yes, delete it!')
    .then(async (btn)=>{
      if (btn.isConfirmed) {
        var res = await data.send();
        if (res) {
          this.removeCommentCard(id);
        }
      }
    })
  }

  async getCommentUpdateCard(id){
    var data = new updateComment(id);
    var res = await data.getHtml();

    if (res) {
      //save the card in cache, if the use want to cancel the update
      CommentCache[id] = document.getElementById(`comment-card-${id}`).innerHTML;
      document.getElementById(`comment-card-${id}`).innerHTML = res;
    }

    return res ? true : false; 
  }

  unsetCommentUpdateCard(id){
    if(CommentCache[id]){
      document.getElementById(`comment-card-${id}`).innerHTML = CommentCache[id];
      delete CommentCache[id];  //remove it from cache
      return true;
    }
    sweetAlert('can\'t reset the card');
    return false;
  }

  async updateComment(id){
    var author = document.getElementById(`update-comment-author-${id}`).value;
    var text = document.getElementById(`update-comment-text-${id}`).value;
    var data = new updateComment(id, author, text);
    var res = await data.send();

    if (res) {
      this.removeCommentCard(id);
      delete CommentCache[id];  //remove it from cache
      await this.pushCommentCard(id);
    }
  }

  getNotFoundPage(){
    var page = new NotFoundPage();
    document.getElementById("main").innerHTML = page.getHtml();
  }

  async refreshComments(){
    var postId = document.getElementById("add-comment-btn").getAttribute('data-post-id');
    var html = new fullComments(postId);
    document.getElementById("comments").innerHTML = await html.getCommentsStyle();
  }

  async pushCommentCard(id){
    var section = document.getElementById("comments");
    var comp = new getComment(id);
    section.innerHTML = await comp.getHtml() + section.innerHTML;
  }

  removeCommentCard(id){
    document.getElementById(`comment-card-${id}`).remove();
  }
}
