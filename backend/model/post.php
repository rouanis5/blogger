<?php
require_once realpath(__DIR__ . '/../helpers/classes/Model.php');
require_once realpath(__DIR__ . '/../helpers/functions.php');
require_once realpath(__DIR__ . '/../helpers/classes/Output.php');

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
        $out = new Output();

        $sql = 'SELECT `id`, `post`, `date_post` FROM `' . $this->table . '`';
        $stmnt = $this->connection->prepare($sql);

        $this->tryCatchPDO($stmnt, function () use ($stmnt, &$out) {
            $res = $stmnt->fetchAll(PDO::FETCH_ASSOC);
            if (empty($res)) {
                $out->push('l\'article n\'est pas trouvé');
            } else {
                $out->true();
                $out->pushArray($res);
            }
        });
        return $out;
    }

    //this is gonna return an object that contains a post by id with its id, text, date
    public function getPostById($id)
    {
        $out = new Output();

        $sql = 'SELECT `id`, `post`, `date_post` FROM `' . $this->table . '` WHERE `id` = :id';
        $stmnt = $this->connection->prepare($sql);
        $stmnt->bindValue(':id', $id, PDO::PARAM_INT);

        $this->tryCatchPDO($stmnt, function () use ($stmnt, &$out) {
            $res = $stmnt->fetch(PDO::FETCH_ASSOC);
            if (empty($res)) {
                $out->push('l\'article n\'est pas trouvé');
            } else {
                $out->true();
                $out->pushArray($res);
            }
        });
        return $out;
    }

    //this is gonna return a boolean, if the post is deleted or not
    //also if the post doesnt exist it will return a false
    public function deletePostById($id)
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

    public function verifyPostById($id)
    {
        //return true if exists, false if it doesnt
        return $this->getPostById($id)->success;
    }

    public function verifyData(?array $data)
    {
        $out = new Output();

        $text = $data['text'] ?? null;
        $date = $data['date'] ?? null;

        if (!$text) {
            $out->push('le text n\'est pas trouvé');
        }

        if (!$date) {
            $out->push('la date n\'est pas trouvée');
        } elseif (!validateDate($date)) {
            $out->push('la date n\'est pas correct');
        }

        if (empty($out->getMessages())) {
            $out->true();
        }
        return $out;
    }

    public function addPost(?array $data)
    {
        $out = new Output();

        $verify = $this->verifyData($data);
        if (!($verify->getSuccess())) {
            $out->pushArray($verify->getMessages());
        }

        if (empty($out->getMessages())) {
            //extract from data:  text, date
            $text = $data['text'];
            $date = $data['date'];

            $sql = 'INSERT INTO `' . $this->table . '` (`post`, `date_post`) VALUES (:text, :date)';
            $stmnt = $this->connection->prepare($sql);
            $stmnt->bindValue(':text', $text);
            $stmnt->bindValue(':date', $date);

            $this->tryCatchPDO($stmnt, function ($executed) use ($stmnt, &$out) {
                if ($stmnt->rowCount() === 0) {
                    $out->push('Insertion de l\'article est échoué');
                } else {
                    $out->true();
                }
            });
        }
        return $out;
    }

    public function updatePostById($id, ?array $data)
    {
        $out = new Output();

        if (!$this->verifyPostById($id)) {
            $out->push('Ce post n\'existe pas');
            return $out;
        }

        $verify = $this->verifyData($data);
        if (!($verify->getSuccess())) {
            $out->pushArray($verify->getMessages());
        }

        if (empty($out->getMessages())) {
            //extract from data: text, date
            $text = $data['text'];
            $date = $data['date'];

            $sql = 'UPDATE `' . $this->table . '` SET `post` = :text, `date_post` = :date WHERE `id` = :id';
            $stmnt = $this->connection->prepare($sql);
            $stmnt->bindValue(':id', $id);
            $stmnt->bindValue(':text', $text);
            $stmnt->bindValue(':date', $date);

            $this->tryCatchPDO($stmnt, function ($executed) use ($stmnt, &$out) {
                if ($stmnt->rowCount() === 0) {
                    $out->push('Modification de l\'article est échoué');
                } else {
                    $out->true();
                }
            });
        }
        return $out;
    }
}
