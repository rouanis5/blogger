<?php
// require realpath(__DIR__ . '/router.php');
require realpath(__DIR__ . '/helpers/classes/Output.php');
require realpath(__DIR__ . '/controller/post.php');
// // require realpath(__DIR__ . '/controller/comment.php');

// // $c = new CommentConroller();

// post('/kak', function () {
//     $p = new PostConroller();
//     $p->getAll();
//     exit;
// });

// post('/get', function () {
//     $p = new PostConroller();
//     $p->get();
//     exit;
// });

// post('/404', function () {
//     $out = new Output();
//     $out->push('Not valid Url');
//     echo json_encode($out);
//     exit;
// });

// any('/404', function () {
//     $out = new Output();
//     $out->push('Only POST requests are allowed !');
//     echo json_encode($out);
// });

$routes = [];

// route('/', function () {
//     echo "Home Page";
// });
route('/kak', function () {
    $p = new PostConroller();
    $p->getAll();
    exit;
});

route('/get', function () {
    $p = new PostConroller();
    $p->get();
    exit;
});

// route('/login', function () {
//     echo "Login Page";
// });

// route('/about-us', function () {
//     echo "About Us";
// });

route('/404', function () {
    echo "Page not found";
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
