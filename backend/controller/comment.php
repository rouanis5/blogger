<?php
require realpath(__DIR__ . '/../helpers/classes/Controller.php');
require realpath(__DIR__ . '/../config/Database.php');
require realpath(__DIR__ . '/../model/comment.php');

class CommentConroller extends Controller
{
    private $comment;

    public function __construct()
    {
        parent::init();
        $db = new Database();
        $this->comment = new Comment($db);
    }

    public function getAll()
    {
        $post_id = $_POST['post_id'] ?? null;
        $this->res = $this->comment->getAllComments($post_id);
    }

    public function get()
    {
        $id = $_POST['id'] ?? null;
        $this->res = $this->comment->getCommentById($id);
    }

    public function add()
    {
        $post_id = $_POST['post_id'] ?? null;
        $author = $_POST['author'] ?? null;
        $text = $_POST['text'] ?? null;
        $date = $_POST['date'] ?? null;

        //we need to enter author, text and date
        $this->res = $this->comment->addComment($post_id, [
            'author' => $author,
            'text' => $text,
            'date' => $date,
        ]);
    }

    public function update()
    {
        $id = $_POST['id'] ?? null;
        $author = $_POST['author'] ?? null;
        $text = $_POST['text'] ?? null;
        $date = $_POST['date'] ?? null;

        //we need to enter author, text and date
        $this->res = $this->comment->updateCommentById($id, [
            'author' => $author,
            'text' => $text,
            'date' => $date,
        ]);
    }

    public function delete()
    {
        $id = $_POST['id'] ?? null;
        $this->res = $this->comment->deleteCommentById($id);
    }
}
