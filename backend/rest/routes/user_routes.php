<?php

require_once __DIR__ . '/../services/UserService.class.php';

require_once __DIR__ . '/../../vendor/autoload.php';

/**
     * @OA\Post(
     *      path="/add_user",
     *      tags={"users"},
     *      summary="Add user data to the database",
     *      @OA\Response(
     *           response=200,
     *           description="User data, or exception if user is not added properly"
     *      ),
     *      @OA\RequestBody(
     *          description="User data payload",
     *          @OA\JsonContent(
     *              required={"first_name","last_name","email"},
     *              @OA\Property(property="id", type="int", example="1", description="User ID"),
     *              @OA\Property(property="username", type="string", example="Some username", description="Users username"),
     *         
     *              @OA\Property(property="email", type="string", example="example@example.com", description="User email address"),
     *             
     *              @OA\Property(property="password", type="string", example="some_secret_password", description="User password")
     *          )
     *      )
     * )
     */

Flight::route('POST /add_user', function(){
    $payload = Flight::request()->data ->getData();
    Flight::set('user_service', new UserService());
    $user = Flight::get('user_service')->add_user($payload);

    Flight::json(['message' => "You have successfully added the user", 'data' => $user]);
});




