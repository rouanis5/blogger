import View from "../helpers/abstractView";

export default class CommentsSection extends View {
  constructor(postId, commentsHtml) {
    super();
    this.postId = postId;
    this.commentsHtml = commentsHtml;
  }

  getHtml() {
    return `
      <section class="my-5">
        <div class="container">
            <div class="row g-5">
                <div class="col">
                    <form id="align-form">
                      <h3 class="mb-4">Leave a comment</h3>
                      <div class="mb-3">
                          <label for="commentText">Message</label>
                          <textarea id="commentText" rows="5" class="form-control"></textarea>
                      </div>
                      <div class="mb-3">
                          <label for="commentAuthor">Name</label>
                          <input type="text" id="commentAuthor" class="form-control">
                      </div>
                      <p class="mb-3 text-secondary"><b>Note :</b> If you don't have an account, an avatar will be used to display your profile picture.</p>
                      <button id="add-comment-btn" data-post-id="${this.postId}" class="btn btn-success" type="submit">Post Comment</button>
                    </form>
                </div>
                <div class="col-lg-5 col-md-6">
                    <h4>Last Comments</h4>
                    <div id="comments">${this.commentsHtml}</div>
                </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
