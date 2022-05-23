<?php
class Controller
{
    public $res;

    public function __destruct()
    {
        if ($this->res) {
            echo json_encode($this->res);
        }
        exit;
    }
}
