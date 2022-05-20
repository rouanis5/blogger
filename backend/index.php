<?php
// require realpath(__DIR__ . '/router.php');
require realpath(__DIR__ . '/helpers/classes/Output.php');
require realpath(__DIR__ . '/controller/post.php');
// // require realpath(__DIR__ . '/controller/comment.php');

// // $c = new CommentConroller();

echo $_SERVER['REQUEST_URI'];
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $out = new Output();
    $out->push('Only POST METHOD is accepted !');
    echo json_encode($out);
    exit;
}

$routes = [];
$p = new PostConroller();

route('/getAll', function () use ($p) {
    $p->getAll();
});

route('/get', function () use ($p) {
    $p->get();
});

route('/404', function () use ($p) {
    $out = new Output();
    $out->push('URL not valid');
    echo json_encode($out);
    exit;
});

function route(string $path, callable $callback)
{
    global $routes;
    $routes[$path] = $callback;
}

run();

function run()
{
    global $routes;
    $uri = $_SERVER['REQUEST_URI'];
    $found = false;
    foreach ($routes as $path => $callback) {
        if ($path !== $uri) {
            continue;
        }

        $found = true;
        $callback();
    }

    if (!$found) {
        $notFoundCallback = $routes['/404'];
        $notFoundCallback();
    }
}
