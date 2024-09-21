<?php

require_once __DIR__ . '/../services/CheckOutService.class.php';
require_once __DIR__ . '/../../vendor/autoload.php';

/**
 * @OA\Post(
 *      path="/add_order",
 *      tags={"orders"},
 *      summary="Add order data to the database",
 *      @OA\Response(
 *           response=200,
 *           description="Order data, or exception if order is not added properly"
 *      ),
 *      @OA\RequestBody(
 *          description="Order data payload",
 *          @OA\JsonContent(
 *              required={"name","surname","email","country","address","city","zip","payment","name_card","num_card","date","cvv","user_id"},
 *              @OA\Property(property="name", type="string", example="John", description="Customer first name"),
 *              @OA\Property(property="surname", type="string", example="Doe", description="Customer last name"),
 *              @OA\Property(property="email", type="string", example="john.doe@example.com", description="Customer email"),
 *              @OA\Property(property="country", type="string", example="USA", description="Customer country"),
 *              @OA\Property(property="address", type="string", example="123 Main St", description="Customer address"),
 *              @OA\Property(property="city", type="string", example="New York", description="Customer city"),
 *              @OA\Property(property="zip", type="string", example="10001", description="Customer postal code"),
 *              @OA\Property(property="payment", type="string", example="credit", description="Payment method"),
 *              @OA\Property(property="name_card", type="string", example="John Doe", description="Name on the card"),
 *              @OA\Property(property="num_card", type="string", example="1234567812345678", description="Card number"),
 *              @OA\Property(property="date", type="string", example="1224", description="Card expiration date"),
 *              @OA\Property(property="cvv", type="string", example="123", description="Card CVV code"),
 *              @OA\Property(property="user_id", type="integer", example="1", description="User ID")
 *          )
 *      )
 * )
 */

 Flight::route('POST /add_order', function(){
    $payload = Flight::request()->data->getData();
    Flight::set('order_service', new CheckOutService());
    $order = Flight::get('order_service')->add_order($payload);
    Flight::json(['message' => "You have successfully added the order", 'data' => $order]);
});
?>

