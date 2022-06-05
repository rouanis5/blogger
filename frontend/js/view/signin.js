import View from "../helpers/abstractView";

const imgUrl = new URL('../../images/favicon/favicon-32x32.png',import.meta.url).href

export default class Signin extends View{
  constructor(){
    super();
  }
  getHtml(){
    return `
    <div class="form-body welcom">
      <div class="form-signin">
        <form class="text-center">
        <img class="bg-white rounded p-1 mb-4" src="${imgUrl}" alt="smile logo" width="48px" height="48px">
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      
          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
          </div>
      
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
      </div>
    </div>
    `;
  }

} 