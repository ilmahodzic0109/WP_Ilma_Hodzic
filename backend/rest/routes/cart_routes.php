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
    $user = Flight::get('user'); // Assuming the user is set in Flight context after authentication
    
    $cart_service = new CartService();
    $cartItems = $cart_service->get_cart_items($user['id']);

    Flight::json(['data' => $cartItems]);
});

