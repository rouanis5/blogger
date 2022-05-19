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

        return $this->tryCatchPDO($stmnt, function () use ($stmnt) {
            return $stmnt->fetchAll(PDO::FETCH_OBJ);
        });
    }

    //this is gonna return an object that contains a post by id with its id, text, date
    public function getPostById(?int $id)
    {
        $sql = 'SELECT `id`, `post`, `date_post` FROM `' . $this->table . '` WHERE `id` = :id';
        $stmnt = $this->connection->prepare($sql);
        $stmnt->bindValue(':id', $id, PDO::PARAM_INT);

        return $this->tryCatchPDO($stmnt, function ($e) use ($stmnt) {
            return var_dump($e);
            return $stmnt->fetchObject();
        });
    }

    //this is gonna return a boolean, if the post is deleted or not
    //also if the post doesnt exist it will return a false
    public function deletePostById(?int $id)
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

    public function verifyPostById(?int $id)
    {
        $post = $this->getPostById($id);
        //return true if exists, false if it doesnt
        return !empty($post);
    }

    public function verifyData($data)
    {
        $errors = [];
        $success = false;
        $output = (object) ['success' => &$success, 'message' => &$errors];

        $text = $data['text'] ?? null;
        $date = $data['date'] ?? null;

        if (!$text) {
            $errors[] = 'le text n\'est pas trouvé';
        }

        if (!$date) {
            $errors[] = 'la date n\'est pas trouvée';
        }

        if (empty($errors)) {
            $success = true;
        }
        return $output;
    }

    public function addPost(?array $data)
    {
        $errors = [];
        $success = false;
        $output = (object) ['success' => &$success, 'message' => &$errors];

        $verify = $this->verifyData($data);
        if (!($verify->success)) {
            $errors = array_merge($errors, $verify->message);
        }

        if (empty($errors)) {
            //extract from data:  text, date
            $text = $data['text'];
            $date = $data['date'];

            $sql = 'INSERT INTO `' . $this->table . '` (`post`, `date_post`) VALUES (:text, :date)';
            $stmnt = $this->connection->prepare($sql);
            $stmnt->bindValue(':text', $text);
            $stmnt->bindValue(':date', $date);

            $this->tryCatchPDO($stmnt, function ($executed) use ($stmnt, &$success, &$errors) {
                if ($stmnt->rowCount() === 0) {
                    $errors[] = 'Insertion de l\'article est échoué';
                } else {
                    $success = true;
                }
            });
        }
        return $output;
    }

    public function updatePostById($id, $data)
    {
        $errors = [];
        $success = false;
        $output = (object) ['success' => &$success, 'message' => &$errors];

        if (!$this->verifyPostById($id)) {
            $errors[] = 'Ce post n\'existe pas';
            return $output;
        }

        $verify = $this->verifyData($data);
        if (!($verify->success)) {
            $errors = array_merge($errors, $verify->message);
        }

        if (empty($errors)) {
            //extract from data: text, date
            $text = $data['text'];
            $date = $data['date'];

            $sql = 'UPDATE `' . $this->table . '` SET `post` = :text, `date_post` = :date WHERE `id` = :id';
            $stmnt = $this->connection->prepare($sql);
            $stmnt->bindValue(':id', $id);
            $stmnt->bindValue(':text', $text);
            $stmnt->bindValue(':date', $date);

            $this->tryCatchPDO($stmnt, function ($executed) use ($stmnt, &$success, &$errors) {
                if ($stmnt->rowCount() === 0) {
                    $errors[] = 'Modification de l\'article est échoué';
                } else {
                    $success = true;
                }
            });
        }
        return $output;
    }
}
