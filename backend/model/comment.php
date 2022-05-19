<?php
require_once '../helpers/classes/Model.php';

class comment extends Model
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
    public function getCommentById(?int $id)
    {
        $success = false;
        $message = [];
        $output = (object) ['message' => &$message, 'success' => &$success];
        $sql = 'SELECT `id`, `post_id`, `author`, `comment`, `date_comment` FROM `' . $this->table . '` WHERE `id` = :id';
        $stmnt = $this->connection->prepare($sql);
        $stmnt->bindValue(':id', $id);

        $this->tryCatchPDO($stmnt, function () use ($stmnt, &$message, &$success) {
            $res = $stmnt->fetch(PDO::FETCH_OBJ);
            if (empty($res)) {
                $message[] = 'Commentaire n\'est pas trouvé';
            } else {
                $success = true;
                $message = $res;
            }
        });
        return $output;
    }

    //get all comments for a specific post using its id;
    public function getAllComments(?int $post_id)
    {
        $success = false;
        $message = [];
        $output = (object) ['message' => &$message, 'success' => &$success];

        $sql = 'SELECT `id`, `post_id`, `author`, `comment`, `date_comment` FROM `' . $this->table . '` WHERE `post_id` = :postId';
        $stmnt = $this->connection->prepare($sql);
        $stmnt->bindValue(':postId', $post_id);

        $this->tryCatchPDO($stmnt, function () use ($stmnt, &$message, &$success) {
            $res = $stmnt->fetchAll(PDO::FETCH_OBJ);
            if (empty($res)) {
                $message[] = 'les Commentaire n\'est pas trouvé';
            } else {
                $success = true;
                $message = $res;
            }
        });
        return $output;

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
