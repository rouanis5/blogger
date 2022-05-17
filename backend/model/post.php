<?php
require_once '../helpers/classes/Model.php';

class Post extends Model
{
    //table name
    private $table = 'posts';

    //post elements
    public $id;
    public $post;
    public $date_post;

    //this is gonna return an object that contains all posts with its id, text, date
    public function getAllPosts()
    {
        $sql = 'SELECT `id`, `post`, `date_post` FROM `' . $this->table . '`';
        $stmnt = $this->connection->prepare($sql);

        return $this->tryCatchPDO($stmnt, function () use ($stmnt, $sql) {
            return $stmnt->fetchAll(PDO::FETCH_OBJ);
        });
    }

    //this is gonna return an object that contains a post by id with its id, text, date
    public function getPost($id)
    {
        $sql = 'SELECT `id`, `post`, `date_post` FROM `' . $this->table . '` WHERE `id` = :id';
        $stmnt = $this->connection->prepare($sql);
        $stmnt->bindValue(':id', $id, PDO::PARAM_INT);

        return $this->tryCatchPDO($stmnt, function () use ($stmnt) {
            return $stmnt->fetchObject();
        });
    }

    //this is gonna return a boolean, if the post is deleted or not
    //also if the post doesnt exist it will return a false 
    public function deletePost($id)
    {
        $sql = 'DELETE FROM `' . $this->table . '` WHERE `id` = :id';
        $stmnt = $this->connection->prepare($sql);
        $stmnt->bindValue(':id', $id, PDO::PARAM_INT);

        return $this->tryCatchPDO($stmnt, function () use ($stmnt) {
            //if the sql didnt runs, the rount will be 0
            //rowCount() number of rows that were deleted
            if ($stmnt->rowCount() === 0) {
                return false;
            }
            return true;
        });
    }
}
