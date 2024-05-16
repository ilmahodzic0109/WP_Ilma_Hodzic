<?php

require_once __DIR__ . '/../dao/ItemDao.class.php';

class ItemService {
    private $item_dao;

    public function __construct() {
        $this->item_dao = new ItemDao();
    }

    // Method to fetch all items using ItemDao
    public function get_all_items() {
        return $this->item_dao->get_all_items();
    }
}

?>