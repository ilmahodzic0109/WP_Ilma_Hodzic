<?php

require_once __DIR__ . '/BaseDao.class.php';

class CartDao extends BaseDao {
    public function __construct() {
        parent::__construct('cart_items');
    }

    public function add_to_cart($cartItem) {
        error_log(print_r($cartItem, true));

        $existingItem = $this->get_cart_item($cartItem['product_id'], $cartItem['user_id']);

        if ($existingItem) {
            $newQuantity = $existingItem['quantity'] + $cartItem['quantity'];
            error_log("Updating quantity for product ID " . $cartItem['product_id'] . " to " . $newQuantity);
            $this->update_cart_item_quantity($cartItem['product_id'], $cartItem['user_id'], $newQuantity);
            $existingItem['quantity'] = $newQuantity;
            return $existingItem;
        } else {
            $query = "INSERT INTO cart_items (product_id, user_id, quantity) VALUES (:product_id, :user_id, :quantity)";
            $statement = $this->connection->prepare($query);

            $statement->bindParam(':product_id', $cartItem['product_id']);
            $statement->bindParam(':user_id', $cartItem['user_id']);
            $statement->bindParam(':quantity', $cartItem['quantity']);

            try {
                $statement->execute();
                $cartItem['id'] = $this->connection->lastInsertId();
                return $cartItem;
            } catch (PDOException $e) {
                error_log("Error inserting cart item: " . $e->getMessage());
                throw $e;
            }
        }
    }

    private function get_cart_item($product_id, $user_id) {
        $query = "SELECT * FROM cart_items WHERE product_id = :product_id AND user_id = :user_id";
        $statement = $this->connection->prepare($query);

        $statement->bindParam(':product_id', $product_id);
        $statement->bindParam(':user_id', $user_id);

        try {
            $statement->execute();
            return $statement->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error fetching cart item: " . $e->getMessage());
            throw $e;
        }
    }

    private function update_cart_item_quantity($product_id, $user_id, $quantity) {
        $query = "UPDATE cart_items SET quantity = :quantity WHERE product_id = :product_id AND user_id = :user_id";
        $statement = $this->connection->prepare($query);

        $statement->bindParam(':quantity', $quantity);
        $statement->bindParam(':product_id', $product_id);
        $statement->bindParam(':user_id', $user_id);

        try {
            $statement->execute();
            error_log("Quantity updated successfully for product ID " . $product_id);
        } catch (PDOException $e) {
            error_log("Error updating cart item quantity: " . $e->getMessage());
            throw $e;
        }
    }

    public function get_cart_items($user_id) {
        $query = "
            SELECT * FROM cart_items WHERE user_id = :user_id";
        $statement = $this->connection->prepare($query);
        $statement->bindParam(':user_id', $user_id);
    
        try {
            $statement->execute();
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error fetching cart items: " . $e->getMessage());
            throw $e;
        }
    }

    public function delete_cart_item($product_id, $user_id) {
        $query = "DELETE FROM cart_items WHERE product_id = :product_id AND user_id = :user_id";
        $statement = $this->connection->prepare($query);

        $statement->bindParam(':product_id', $product_id);
        $statement->bindParam(':user_id', $user_id);

        try {
            $statement->execute();
            error_log("Item with product ID " . $product_id . " deleted successfully");
        } catch (PDOException $e) {
            error_log("Error deleting cart item: " . $e->getMessage());
            throw new Exception("Error deleting cart item: " . $e->getMessage());
        }
    }
}