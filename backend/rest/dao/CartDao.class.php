<?php

require_once __DIR__ . '/BaseDao.class.php';

class CartDao extends BaseDao {
    public function __construct() {
        parent::__construct('cart');
    }
   
    public function add_to_cart($item) {
        $query = "INSERT INTO cart ( quantity, product_id)
                  VALUES ( :quantity, :product_id)";
        $statement = $this->connection->prepare($query);
        
        // Bind parameters
        
        $statement->bindParam(':quantity', $item['quantity']);
        $statement->bindParam(':product_id', $item['product_id']);
        
        // Execute the statement
        $statement->execute();
        
        // Get the ID of the inserted cart item
        $item['id'] = $this->connection->lastInsertId();
        
        return $item;
    }
}
