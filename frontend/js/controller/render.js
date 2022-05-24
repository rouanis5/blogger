import Header from "../view/header";
import Footer from "../view/footer";
import displayArticle from "./article";
import displayArticles from "./articles";
import AddPage from "../view/addPage";
import addArticle from "./addArticle";

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
    var articles = new displayArticles();
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
    var page = new AddPage();
    document.getElementById("main").innerHTML = page.getHtml();
  }

  async addArticle() {
    var data = new addArticle(document.getElementById("textarea").value);
    var res = await data.send();
    return res;
  }
}
