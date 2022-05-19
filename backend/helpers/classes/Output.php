<?php

class Output
{
    public $message = [];
    public $success = false;

    public function init(?array &$message, ?bool &$success)
    {
        $this->message = &$message;
        $this->success = &$success;
    }

    public function getMessages(?int $index = null)
    {
        if (isset($index)) {
            return $this->message[$index];
        }
        return $this->message;
    }

    public function getSuccess()
    {
        return $this->success;
    }

    public function false()
    {
        $this->success = false;
    }

    public function true()
    {
        $this->success = true;
    }

    public function push(?string $message)
    {
        $this->message[] = $message;
    }

    public function pushArray(?array $messages)
    {
        $this->message = array_merge((array) $this->message, $messages);
    }
}
