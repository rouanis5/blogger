import View from "./abstractView";

export default class Header extends View {
  getHtml() {
    return `
    <nav class="navbar navbar-expand-lg navbar-dark bg-success sticky-top">
        <div class="container">
            <a class="navbar-brand fw-bold d-flex align-items-center" href="#">
                <img class="bg-white rounded p-1 me-2" src="./images/favicon/favicon-32x32.png" alt="smile logo">
                IMO
            </a>
            <button
                class="navbar-toggler d-lg-none text-success"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavId">
                <ul class="navbar-nav ms-lg-auto ms-2 mt-2 mt-lg-0 mb-lg-0 mb-2">
                    <li class="nav-item active">
                        <a class="nav-link text-light" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Services</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Portfolio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <li class="nav-item text-success d-none d-lg-flex">
                        <i class="fa-solid fa-magnifying-glass h4 my-auto px-3"></i>
                    </li>
                    <a class="btn btn-light text-success main-btn rounded fw-bold px-4">Login</a>
                </div>
            </div>
        </div>
    </nav>
   `;
  }
}
