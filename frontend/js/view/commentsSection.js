import View from "../helpers/abstractView";

export default class CommentsSection extends View {
  constructor(postId) {
    super();
    this.postId = postId;
  }

  getHtml() {
    return `
      <section class="my-5">
        <div class="container">
            <div class="row">
                <div class="col-sm-5 col-md-6 col-12 mb-4">
                    <h1>Comments</h1>
                    ${'don\'t froget to add comments here!'}
                </div>
                <div class="col offset-md-1 offset-sm-1 mt-4">
                    <form id="align-form">
                      <h4 class="mb-4">Leave a comment</h4>
                      <div class="mb-3">
                          <label for="commentText">Message</label>
                          <textarea id="commentText" rows="5" class="form-control"></textarea>
                      </div>
                      <div class="mb-3">
                          <label for="commentAuthor">Name</label>
                          <input type="text" id="commentAuthor" class="form-control">
                      </div>
                        <p class="mb-3 text-secondary"><b>Note :</b> If you don't have an account, an avatar will be used to display your profile picture.</p>
                      <button id="commentBtn" data-post-id="${this.postId}" class="btn btn-success" type="button">Post Comment</button>
                    </form>
                </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
