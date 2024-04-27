<?php

require_once __DIR__ . '/services/UserService.class.php';

// Use $_POST instead of $_REQUEST if you are expecting POST data
$payload = $_REQUEST;

/*if ($payload['username'] == NULL || $payload['username'] == '') {
    header('HTTP/1.1 500 Bad Request');
    die(json_encode(['error' => "User name field is missing"]));
}*/

$user_service = new UserService();
$user= $user_service->add_user($payload);

echo json_encode(['message' =>"You have successfully added the user", 'data' => $user]);

