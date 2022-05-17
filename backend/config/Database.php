<?php
require realpath(__DIR__ . '/../vendor/autoload.php');
use Dotenv\Dotenv;

$dotenev = Dotenv::createImmutable(__DIR__ . '/../');

$getenv = $dotenev->load();
define('GET_ENV', $getenv);

require_once '../helpers/classes/Model.php';

class Database extends Model
{
    private $host = GET_ENV['MYSQL_HOST'];
    private $port = GET_ENV['MYSQL_PORT'];
    private $database = GET_ENV['MYSQL_DB'];
    private $username = GET_ENV['MYSQL_USER'];
    private $password = GET_ENV['MYSQL_PASSWORD'];

    public function __construct()
    {
        $this->connection = null;
        try {
            $this->connection = new PDO("mysql:host=$this->host;port=$this->port;dbname=$this->database", "$this->username", "$this->password");
        } catch (PDOException $error) {
            $this->errors[] = $error->getMessage();
        }
        return $this->connection;
    }

    public function connect()
    {
        return $this->connection;
    }
}
