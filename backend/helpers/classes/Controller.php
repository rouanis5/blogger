<?php
namespace Helpers\classes;

class Controller
{
    public $res;

    public function __destruct()
    {
        if ($this->res) {
            echo json_encode($this->res);
        }
    }
}
