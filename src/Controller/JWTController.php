<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

use ConfigFile;
use DateTime;

class JWTController extends AbstractController
{

    public static function setJWT()
    {

        include_once '../ConfigFile.php';

        $currentDateTime = new DateTime();

        $key = ConfigFile::$secretKeyJwt;

        $payload = [
            'iss' => 'music_app',
            'aud' => 'music_app',
            'iat' => $currentDateTime->format('U'),
            'nbf' => $currentDateTime->format('U'),
            'exp' => $currentDateTime->format('U') + 1800
        ];

        $jwt = JWT::encode($payload, $key, 'HS256');

        return $jwt;
    }

    public static function checkJWT($jwt) {

        include_once '../ConfigFile.php';

        $key = ConfigFile::$secretKeyJwt;

        try {

            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
            return true;
        }

        catch (\Exception $e) {

            return false;
        }
    }
}
