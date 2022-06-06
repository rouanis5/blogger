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
  function create($username , $email , $password){
    $out = new Output();
  
    // sanitize
    $username = htmlspecialchars(strip_tags($username));
    $email = htmlspecialchars(strip_tags($email));
    $password = htmlspecialchars(strip_tags($password));

    $validation = $this->isEmailValid($email);

    if (! $validation->getSuccess()) {
      $out->pushArray($validation->getMessages());
    }
    
    if (empty($out->getMessages())){
      $query = "INSERT INTO " . $this->table . " SET
                  `username` = :username,
                  `email` = :email,
                  `password` = :password";
      $stmnt = $this->connection->prepare($query);

      $stmnt->bindParam(':username', $username);
      $stmnt->bindParam(':email', $email);

      // hash the password before saving to database
      $password_hash = password_hash($password, PASSWORD_BCRYPT);
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
    }
    return $out;
  }

  // check if given email exist in the database
  function isEmailValid($email, $except = null){
    $out = new Output();

    //it's OK if the except and the email are the same
    if ($except && $except === $email) {
      $out->true();
      return $out;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $out->push("Email not valid");
    }else{
      $query = "SELECT `id` FROM " . $this->table . " WHERE `email` = :email LIMIT 0,1";
      $stmt = $this->connection->prepare( $query );
  
      // sanitize
      $email=htmlspecialchars(strip_tags($email));
      $stmt->bindParam(':email', $email);
  
      $this->tryCatchPDO($stmt, function() use ($stmt, &$out){
        // get number of rows
        $num = $stmt->rowCount();
        if ($num > 0) {
          $out->push('Email exists !');
        }else{
          $out->true();
        }
      });
    }

    return $out;
  }
}