<?php

require_once __DIR__ . '/../dao/CheckoutDao.class.php';


class CheckOutService {
    private $order_dao;

    public function __construct() {
        $this->order_dao = new OrderDao();
    }

    public function add_order($order) {
        return $this->order_dao->add_order($order);
    }
}
?>
