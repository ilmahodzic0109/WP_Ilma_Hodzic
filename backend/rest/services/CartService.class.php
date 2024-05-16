<?php

require_once __DIR__ . '/../dao/CartDao.class.php';

class CartService {
    private $cart_dao;

    public function __construct() {
        $this->cart_dao = new CartDao();
    }

    public function add_to_cart($item) {
        // Validate item data if needed
        // For example: check if quantity is numeric and positive

        // Call the add_to_cart method of the CartDao to add the item to the cart
        return $this->cart_dao->add_to_cart($item);
    }
}
