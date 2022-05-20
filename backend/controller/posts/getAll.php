<?php
include_once realpath(__DIR__ . '/../../helpers/headers.php');

require_once realpath(__DIR__ . '/../../config/Database.php');
require_once realpath(__DIR__ . '/../../model/post.php');

$db = new Database();
$post = new Post($db);

$res = $post->getAllPosts();

echo json_encode($res);
