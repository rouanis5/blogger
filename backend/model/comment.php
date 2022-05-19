<?php
require_once '../helpers/classes/Model.php';

class Post extends Model
{
    //table name
    private $table = 'comments';

    //elements
    public $id;
    public $post_id;
    public $author;
    public $comment;
    public $date_comment;

    //get
    public function getCommentById($id)
    {
    }

    //get all comments for a specific post using its id;
    public function getAllCommentsByPostId($post_id)
    {
    }

    public function addComment($id, $data)
    {
    }

    public function updateCommentById($id, $data)
    {
    }

    public function deleteCommentById($id)
    {
    }
}
