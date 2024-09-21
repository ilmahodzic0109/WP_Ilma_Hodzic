<?php

require 'vendor/autoload.php';
require 'rest/routes/middleware_routes.php';
require 'rest/routes/item_routes.php';
require 'rest/routes/user_routes.php';
require 'rest/routes/auth_routes.php';
require 'rest/routes/cart_routes.php';
require 'rest/routes/checkout_routes.php';

Flight::start();
