<?php
//credits to: https://github.com/phprouter/main
require_once realpath(__DIR__ . '/router.php');
require_once realpath(__DIR__ . '/helpers/classes/Output.php');

post('/404', function () {
    $out = new Output();
    $out->push('Not valid Url');
    echo json_encode($out);
});

any('/404', function () {
    $out = new Output();
    $out->push('Only POST requests are allowed !');
    echo json_encode($out);
});
