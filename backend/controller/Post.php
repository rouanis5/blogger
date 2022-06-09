<?php
namespace Controller;
use Model, Helpers\classes\Controller,  Config\Database;

class Post extends Controller
{
    private $post;

    public function __construct()
    {
        $db = new Database();
        $this->post = new Model\Post($db);
    }

    public function getAll()
    {
        $this->res = $this->post->getAllPosts();
    }

    public function get()
    {
        $id = $_POST['id'] ?? null;

        $this->res = $this->post->getPostById($id);
    }

    public function add()
    {
        $text = $_POST['text'] ?? null;
        $date = $_POST['date'] ?? null;

        //we need to enter text and date
        $this->res = $this->post->addPost([
            'text' => $text,
            'date' => $date,
        ]);
    }

    public function update()
    {
        $id = $_POST['id'] ?? null;
        $text = $_POST['text'] ?? null;
        $date = $_POST['date'] ?? null;

        //we need to enter text and date
        $this->res = $this->post->updatePostById($id, [
            'text' => $text,
            'date' => $date,
        ]);
    }

    public function delete()
    {
        $id = $_POST['id'] ?? null;

        $this->res = $this->post->deletePostById($id);
    }

}
