<?php
require_once realpath(__DIR__ . '/../helpers/classes/Model.php');
require_once realpath(__DIR__ . '/../helpers/functions.php');
require_once realpath(__DIR__ . '/../helpers/classes/Output.php');

class User extends Model
{
  //table name
  private $table = 'users';

  //post elements
  public $id;
  public $username;
  public $email;
  public $password;
  public $created;
  public $modified;

  // create new user record
  function create(){
    $out = new Output();
  
    // insert query
    $query = "INSERT INTO " . $this->table . " SET
                `username` = :username,
                `email` = :email,
                `password` = :password";

    // prepare the query
    $stmnt = $this->connection->prepare($query);

    // sanitize
    $this->username = htmlspecialchars(strip_tags($this->username));
    $this->email = htmlspecialchars(strip_tags($this->email));
    $this->password = htmlspecialchars(strip_tags($this->password));

    // bind the values
    $stmnt->bindParam(':username', $this->username);
    $stmnt->bindParam(':email', $this->email);

    // hash the password before saving to database
    $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
    $stmnt->bindParam(':password', $password_hash);

    // execute the query, also check if query was successful
    $this->tryCatchPDO($stmnt, function() use ($out , $stmnt){
      //if the sql didnt runs, the rount will be 0
      //rowCount() number of rows that were deleted
      if ($stmnt->rowCount() === 0) {
        $out->push('Adding new user failed');
      } else {
        $out->true();
      }
    });

    return $out;
  }
}