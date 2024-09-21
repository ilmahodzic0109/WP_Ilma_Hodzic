<?php

require_once __DIR__ . '/../services/CartService.class.php';

/**
 * @OA\Post(
 *      path="/add_to_cart",
 *      tags={"cart"},
 *      summary="Add item to the cart",
 *      @OA\Response(
 *           response=200,
 *           description="Item added to the cart"
 *      ),
 *      @OA\RequestBody(
 *          description="Cart item payload",
 *          @OA\JsonContent(
 *              required={"product_id","quantity"},
 *              @OA\Property(property="product_id", type="int", example=1, description="Product ID"),
 *              @OA\Property(property="quantity", type="int", example=1, description="Quantity")
 *          )
 *      )
 * )
 */

// Assuming you're using FlightPHP
Flight::route('POST /add_to_cart', function(){
    $data = Flight::request()->data->getData();
    $product_id = $data['product_id'];
    $user_id = $data['user_id'];
    $quantity = $data['quantity'];

    // Check if user_id is correctly received
    if (!$user_id) {
        Flight::json(["message" => "User ID is missing"], 400);
        return;
    }

    $cartDao = new CartDao();
    $cartItem = $cartDao->add_to_cart(['product_id' => $product_id, 'user_id' => $user_id, 'quantity' => $quantity]);

    Flight::json(['message' => 'Item added to cart', 'data' => $cartItem]);
});



/**
 * @OA\Get(
 *      path="/get_cart_items",
 *      tags={"cart"},
 *      summary="Get items in the cart",
 *      @OA\Response(
 *           response=200,
 *           description="Items in the cart"
 *      )
 * )
 */

Flight::route('GET /get_cart_items', function(){
    try {
        $user_id = Flight::request()->query['user_id'];

        if (!$user_id) {
            Flight::json(["message" => "User ID is missing"], 400);
            return;
        }

        $cart_service = new CartService();
        $cartItems = $cart_service->get_cart_items($user_id);

        Flight::json(['data' => $cartItems]);
    } catch (Exception $e) {
        error_log("Error fetching cart items: " . $e->getMessage());
        Flight::json(['message' => 'Internal server error'], 500);
    }
});


/**
 * @OA\Delete(
 *      path="/delete_cart_item",
 *      tags={"cart"},
 *      summary="Delete item from the cart",
 *      @OA\Response(
 *           response=200,
 *           description="Item deleted from the cart"
 *      ),
 *      @OA\RequestBody(
 *          description="Cart item payload",
 *          @OA\JsonContent(
 *              required={"product_id", "user_id"},
 *              @OA\Property(property="product_id", type="int", example=1, description="Product ID"),
 *              @OA\Property(property="user_id", type="int", example=1, description="User ID")
 *          )
 *      )
 * )
 */

 Flight::route('DELETE /delete_cart_item', function(){
    $data = Flight::request()->data->getData();
    $product_id = $data['product_id'];
    $user_id = $data['user_id'];

    if (!$user_id) {
        Flight::json(["message" => "User ID is missing"], 400);
        return;
    }

    $cartDao = new CartDao();
    try {
        $cartDao->delete_cart_item($product_id, $user_id);
        Flight::json(['message' => 'Item deleted from cart'], 200);
    } catch (Exception $e) {
        error_log("Error deleting cart item: " . $e->getMessage());
        Flight::json(['message' => 'Internal server error'], 500);
    }
});