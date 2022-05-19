<?php
require_once '../helpers/classes/Model.php';
require_once '../helpers/functions.php';

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

    public function verifyData(?array $data)
    {
        $errors = [];
        $success = false;
        $output = (object) ['success' => &$success, 'message' => &$errors];

        $author = $data['author'] ?? null;
        $text = $data['text'] ?? null;
        $date = $data['date'] ?? null;

        if (!$author) {
            $errors[] = 'l\'auteur est invalid';
        }

        if (!$text) {
            $errors[] = 'le text n\'est pas trouvé';
        }

        if (!$date) {
            $errors[] = 'la date n\'est pas trouvée';
        } else if (!validateDate($date)) { //check the date linke 'y-m-d' : '2022-12-31'
            $errors[] = 'la date n\'est pas correct';
        }

        if (empty($errors)) {
            $success = true;
        }
        return $output;
    }

    public function addComment(?int $post_id, ?array $data)
    {
        $errors = [];
        $success = false;
        $output = (object) ['success' => &$success, 'message' => &$errors];

        $verify = $this->verifyData($data);
        if (!($verify->success)) {
            $errors = array_merge($errors, $verify->message);
        }

        if (empty($errors)) {
            //extract from data:  author, text, date
            $author = $data['author'];
            $text = $data['text'];
            $date = $data['date'];

            $sql = 'INSERT INTO `' . $this->table . '` (`post_id`, `author`, `comment`, `date_comment`) VALUES (:postId, :author, :text, :date)';
            $stmnt = $this->connection->prepare($sql);
            $stmnt->bindValue(':postId', $post_id);
            $stmnt->bindValue(':author', $author);
            $stmnt->bindValue(':text', $text);
            $stmnt->bindValue(':date', $date);

            $this->tryCatchPDO($stmnt, function () use ($stmnt, &$success, &$errors) {
                if ($stmnt->rowCount() === 0) {
                    $errors[] = 'Insertion de l\'article est échoué';
                } else {
                    $success = true;
                }
            });
        }
        return $output;
    }

    public function verifyCommentById(?int $id)
    {
        return $this->getCommentById($id)->success;
    }

    public function updateCommentById($id, $data)
    {
        $errors = [];
        $success = false;
        $output = (object) ['success' => &$success, 'message' => &$errors];

        //check if the comment exists or not
        if (!$this->verifyCommentById($id)) {
            $errors[] = 'Ce commentaire n\'existe plus!';
            return $output;
        }

        $verify = $this->verifyData($data);
        if (!($verify->success)) {
            $errors = array_merge($errors, $verify->message);
        }

        if (empty($errors)) {
            //extract from data:  author, text, date
            $author = $data['author'];
            $text = $data['text'];
            $date = $data['date'];

            $sql = 'UPDATE `' . $this->table . '` SET `author` = :author, `comment` = :text, `date_comment` = :date WHERE `id` = :id';
            $stmnt = $this->connection->prepare($sql);
            $stmnt->bindValue(':id', $id);
            $stmnt->bindValue(':author', $author);
            $stmnt->bindValue(':text', $text);
            $stmnt->bindValue(':date', $date);

            $this->tryCatchPDO($stmnt, function () use ($stmnt, &$success, &$errors) {
                if ($stmnt->rowCount() === 0) {
                    $errors[] = 'La modification du commantaire est échoué';
                } else {
                    $success = true;
                }
            });
        }
        return $output;
    }

    public function deleteCommentById($id)
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
