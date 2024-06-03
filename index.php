<?php

require 'vendor/autoload.php';
require 'frontend/rest/routes/middleware_routes.php';
require 'frontend/rest/routes/item_routes.php';
require 'frontend/rest/routes/user_routes.php';
require 'frontend/rest/routes/auth_routes.php';
require 'frontend/rest/routes/cart_routes.php';

Flight::start();
