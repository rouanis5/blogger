<?php
class Controller
{
    public $res;

    public function init()
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    }

    public function __destruct()
    {
        if ($this->res) {
            echo json_encode($this->res);
        }
        exit;
    }
}
