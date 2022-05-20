<?php
include_once realpath(__DIR__ . '/../../helpers/headers.php');

require_once realpath(__DIR__ . '/../../config/Database.php');
require_once realpath(__DIR__ . '/../../model/post.php');

$id = $_POST['id'] ?? null;

$db = new Database();
$post = new Post($db);

$res = $post->deletePostById($id);

echo json_encode($res);
