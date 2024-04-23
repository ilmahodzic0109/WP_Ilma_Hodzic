<?php

require_once __DIR__ . '/BaseDao.class.php';

class UserDao extends BaseDao {
    public function __construct() {
        parent::__construct('user');
    }
   
    public function add_user($user){
        $query = "INSERT INTO user (user_name, email, password)
                  VALUES (:username, :email, :password)";
        $statement = $this->connection->prepare($query);
        
        // Bind parameters
        $statement->bindParam(':username', $user['username']);
        $statement->bindParam(':email', $user['email']);
        $statement->bindParam(':password', $user['password']);
        
        // Execute the statement
        $statement->execute();
        
        // Get the ID of the inserted user
        $user['id'] = $this->connection->lastInsertId();
        
        return $user;
    }
    
}