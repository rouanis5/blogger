<?php
class Model
{
    protected $connection;
    private $errors = [];

    public function __construct($db)
    {
        $this->connection = $db->connect();
    }

    public function getErrors()
    {
        return $this->errors;
    }

    public function tryCatchPDO($stmnt, $callBackFunction)
    {
        try {
            if ($stmnt->execute()) {
                $execute_state = true;
            } else {
                $execute_state = false;
            }

            //the user will chose what function he wants
            return $callBackFunction($execute_state);
        } catch (PDOException $error) {
            $this->errors[] = $error->getMessage();
        }

    }

    public function __destruct()
    {
        $this->connection = null;
    }
}
