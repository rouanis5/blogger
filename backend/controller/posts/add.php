<?php
include_once realpath(__DIR__ . '/../../helpers/headers.php');

require_once realpath(__DIR__ . '/../../config/Database.php');
require_once realpath(__DIR__ . '/../../model/post.php');

$text = $_POST['text'] ?? null;
$date = $_POST['date'] ?? null;

$db = new Database();
$post = new Post($db);

//we need to enter text and date
$res = $post->addPost([
    'text' => $text,
    'date' => $date,
]);

echo json_encode($res);
