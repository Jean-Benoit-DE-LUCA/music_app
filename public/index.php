<?php

use App\Kernel;
use App\Functions\ConfigFunctions;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

$configObj = new ConfigFunctions();

$configObj->checkLogout();

if (!$configObj->checkUrl()) {
    header('Location: /music');
    die();
}

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
