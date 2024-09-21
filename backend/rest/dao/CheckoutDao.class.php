<?php

require_once __DIR__ . '/BaseDao.class.php';

class OrderDao extends BaseDao {
    public function __construct() {
        parent::__construct('orders'); 
    }

    public function add_order($order) {
        $query = "INSERT INTO orders (name, surname, email, country, address, city, zip, payment, name_card, num_card, date, cvv, user_id)
                  VALUES (:name, :surname, :email, :country, :address, :city, :zip, :payment, :name_card, :num_card, :date, :cvv, :user_id)";
        $statement = $this->connection->prepare($query);

        $statement->bindParam(':name', $order['name']);
        $statement->bindParam(':surname', $order['surname']);
        $statement->bindParam(':email', $order['email']);
        $statement->bindParam(':country', $order['country']);
        $statement->bindParam(':address', $order['address']);
        $statement->bindParam(':city', $order['city']);
        $statement->bindParam(':zip', $order['zip']);
        $statement->bindParam(':payment', $order['payment']);
        $statement->bindParam(':name_card', $order['name_card']);
        $statement->bindParam(':num_card', $order['num_card']);
        $statement->bindParam(':date', $order['date']);
        $statement->bindParam(':cvv', $order['cvv']);
        $statement->bindParam(':user_id', $order['user_id']);

        $statement->execute();

        $order['order_id'] = $this->connection->lastInsertId();

        return $order;
    }
}
?>


