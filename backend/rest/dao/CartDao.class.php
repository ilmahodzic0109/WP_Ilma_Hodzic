<?php

require_once __DIR__ . '/BaseDao.class.php';

class CartDao extends BaseDao {
    public function __construct() {
        parent::__construct('cart_items');
    }

    public function add_to_cart($cartItem) {
        // Log the incoming cart item data
        error_log(print_r($cartItem, true));

        // Check if the item already exists in the cart
        $existingItem = $this->get_cart_item($cartItem['product_id'], $cartItem['user_id']);

        if ($existingItem) {
            // Update the quantity if the item exists
            $newQuantity = $existingItem['quantity'] + $cartItem['quantity'];
            $this->update_cart_item_quantity($existingItem['id'], $newQuantity);
            $existingItem['quantity'] = $newQuantity;
            return $existingItem;
        } else {
            // Insert a new item if it doesn't exist
            $query = "INSERT INTO cart_items (product_id, user_id, quantity) VALUES (:product_id, :user_id, :quantity)";
            $statement = $this->connection->prepare($query);

            $statement->bindParam(':product_id', $cartItem['product_id']);
            $statement->bindParam(':user_id', $cartItem['user_id']);
            $statement->bindParam(':quantity', $cartItem['quantity']);

            $statement->execute();

            $cartItem['id'] = $this->connection->lastInsertId();
            return $cartItem;
        }
    }

    private function get_cart_item($product_id, $user_id) {
        $query = "SELECT * FROM cart_items WHERE product_id = :product_id AND user_id = :user_id";
        $statement = $this->connection->prepare($query);

        $statement->bindParam(':product_id', $product_id);
        $statement->bindParam(':user_id', $user_id);

        $statement->execute();
        return $statement->fetch(PDO::FETCH_ASSOC);
    }

    private function update_cart_item_quantity($id, $quantity) {
        $query = "UPDATE cart_items SET quantity = :quantity WHERE id = :id";
        $statement = $this->connection->prepare($query);

        $statement->bindParam(':quantity', $quantity);
        $statement->bindParam(':id', $id);

        $statement->execute();
    }

    public function get_cart_items($user_id) {
        $query = "SELECT * FROM cart_items WHERE user_id = :user_id";
        $statement = $this->connection->prepare($query);
        $statement->bindParam(':user_id', $user_id);
        $statement->execute();
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
    
}
