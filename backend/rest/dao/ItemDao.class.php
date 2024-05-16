<?php

require_once __DIR__ . '/BaseDao.class.php';

class ItemDao extends BaseDao {
    public function __construct() {
        parent::__construct('item');
    }

    // Method to fetch all items from the 'item' table
    public function get_all_items() {
        $query = 'SELECT * FROM item';
        $statement = $this->connection->query($query);
        $items = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $items;
    }
    
}