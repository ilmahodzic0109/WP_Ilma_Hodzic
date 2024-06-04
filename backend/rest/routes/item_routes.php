<?php

require_once __DIR__ . '/../services/ItemService.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

/**
     * @OA\Get(
     *      path="/items",
     *      tags={"items"},
     *      summary="Get all items",
     *      @OA\Response(
     *           response=200,
     *           description="Array of all items in the databases"
     *      )
     * )
     */

Flight::route('GET /items', function(){
    
    Flight::set('item_service', new ItemService());
    $items = Flight::get('item_service')->get_all_items();

    header('Content-Type: application/json');
    Flight::json($items, 200);
});