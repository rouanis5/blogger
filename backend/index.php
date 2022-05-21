<?php
// require realpath(__DIR__ . '/router.php');
require_once realpath(__DIR__ . '/helpers/classes/Output.php');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $out = new Output();
    $out->push('Only POST METHOD is accepted !');
    echo json_encode($out);
    exit;
}

$routes = [];
$action = $_POST['action'] ?? null;

switch ($action) {
    case 'post':
        require_once realpath(__DIR__ . '/controller/post.php');
        $p = new PostConroller();
        route('/get/all', function () use ($p) {
            $p->getAll();
        });

        route('/get', function () use ($p) {
            $p->get();
        });

        route('/add', function () use ($p) {
            $p->add();
        });

        route('/update', function () use ($p) {
            $p->update();
        });

        route('/delete', function () use ($p) {
            $p->delete();
        });

        break;
    case 'comment':
        require_once realpath(__DIR__ . '/controller/comment.php');
        $c = new CommentConroller();
        route('/getAll', function () use ($c) {
            $c->getAll();
        });

        route('/get', function () use ($c) {
            $c->get();
        });

        route('/add', function () use ($c) {
            $c->add();
        });

        route('/update', function () use ($c) {
            $c->update();
        });

        route('/delete', function () use ($c) {
            $c->delete();
        });
        break;
    default:
        break;
}

route('/404', function () {
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
