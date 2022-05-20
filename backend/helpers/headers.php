<?php
// Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    require realpath(__DIR__ . '/../helpers/classes/Output.php');
    $out = new Output();
    $out->push('Only POST requests are allowed !');
    echo json_encode($out);
    exit;
}
