<?php

require_once __DIR__ . '/../dao/CartDao.class.php';

class CartService {
    private $cart_dao;

    public function __construct() {
        $this->cart_dao = new CartDao();
    }

    public function get_cart_items($user_id) {
        return $this->cart_dao->get_cart_items($user_id);
    }

    public function add_to_cart($cartItem) {
        return $this->cart_dao->add_to_cart($cartItem);
    }
    
}
