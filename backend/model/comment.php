<?php
require_once realpath(__DIR__ . '/../helpers/classes/Model.php');
require_once realpath(__DIR__ . '/../helpers/functions.php');
require_once realpath(__DIR__ . '/../helpers/classes/Output.php');

class Comment extends Model
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
        $out = new Output();
        $sql = 'SELECT `id`, `post_id`, `author`, `comment`, `date_comment` FROM `' . $this->table . '` WHERE `id` = :id';
        $stmnt = $this->connection->prepare($sql);
        $stmnt->bindValue(':id', $id);

        $this->tryCatchPDO($stmnt, function () use ($stmnt, &$out) {
            $res = $stmnt->fetch(PDO::FETCH_ASSOC);
            if (empty($res)) {
                $out->push('Commentaire n\'est pas trouvé');
            } else {
                $out->true();
                $out->pushArray($res);
            }
        });
        return $out;
    }

    //get all comments for a specific post using its id;
    public function getAllComments($post_id)
    {
        $out = new Output();

        $sql = 'SELECT `id`, `post_id`, `author`, `comment`, `date_comment` FROM `' . $this->table . '` WHERE `post_id` = :postId';
        $stmnt = $this->connection->prepare($sql);
        $stmnt->bindValue(':postId', $post_id);

        $this->tryCatchPDO($stmnt, function () use ($stmnt, &$out) {
            $res = $stmnt->fetchAll(PDO::FETCH_ASSOC);
            if (empty($res)) {
                $out->push('les Commentaire n\'est pas trouvé');
            } else {
                $out->true();
                $out->pushArray($res);
            }
        });
        return $out;
    }

    public function verifyData(?array $data)
    {
        $out = new Output();

        $author = $data['author'] ?? null;
        $text = $data['text'] ?? null;
        $date = $data['date'] ?? null;

        if (!$author) {
            $out->push('l\'auteur est invalid');
        }

        if (!$text) {
            $out->push('le text n\'est pas trouvé');
        }

        if (!$date) {
            $out->push('la date n\'est pas trouvée');
        } else if (!validateDate($date)) { //check the date linke 'y-m-d' : '2022-12-31'
            $out->push('la date n\'est pas correct');
        }

        if (empty($out->getMessages())) {
            $out->true();
        }
        return $out;
    }

    public function addComment($post_id, ?array $data)
    {
        $out = new Output();

        $verify = $this->verifyData($data);
        if (!($verify->getSuccess())) {
            $out->pushArray($verify->getMessages());
        }

        if (empty($out->getMessages())) {
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

            $this->tryCatchPDO($stmnt, function () use ($stmnt, &$out) {
                if ($stmnt->rowCount() === 0) {
                    $out->push('Insertion de l\'article est échoué');
                } else {
                    $out->true();
                }
            });
        }
        return $out;
    }

    public function verifyCommentById($id)
    {
        return $this->getCommentById($id)->getSuccess();
    }

    public function updateCommentById($id, ?array $data)
    {
        $out = new Output();

        //check if the comment exists or not
        if (!$this->verifyCommentById($id)) {
            $out->push('Ce commentaire n\'existe plus!');
            return $out;
        }

        $verify = $this->verifyData($data);
        if (!($verify->getSuccess())) {
            $out->pushArray($verify->getMessages());
        }

        if (empty($out->getMessages())) {
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

            $this->tryCatchPDO($stmnt, function () use ($stmnt, &$out) {
                if ($stmnt->rowCount() === 0) {
                    $out->push('La modification du commantaire est échoué');
                } else {
                    $out->true();
                }
            });
        }
        return $out;
    }

    public function deleteCommentById($id)
    {
        $out = new Output();

        $sql = 'DELETE FROM `' . $this->table . '` WHERE `id` = :id';
        $stmnt = $this->connection->prepare($sql);
        $stmnt->bindValue(':id', $id, PDO::PARAM_INT);

        $this->tryCatchPDO($stmnt, function () use ($stmnt, &$out) {
            //if the sql didnt runs, the rount will be 0
            //rowCount() number of rows that were deleted
            if ($stmnt->rowCount() === 0) {
                $out->push('la supression de l\'article est échoué');
            } else {
                $out->true();
            }
        });
        return $out;
    }
}
