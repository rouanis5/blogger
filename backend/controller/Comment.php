<?php
namespace Controller;
use Model, Helpers\classes\Controller,  Config\Database;

class Comment extends Controller
{
    private $comment;

    public function __construct()
    {
        $db = new Database();
        $this->comment = new Model\Comment($db);
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

    public function getLast()
    {
        $post_id = $_POST['post_id'] ?? null;
        $this->res = $this->comment->getLastComment($post_id);
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
