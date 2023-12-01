<?php

namespace App\Functions;

class RegistrationFunctions {

    public function checkSpecialCharacter($string) {

        $invalidCharacters = ['"', '\'', '&', '<', '>'];
        $flag = false;

        for ($ind = 0; $ind < strlen($string); $ind++) {

            if (in_array($string[$ind], $invalidCharacters)) {

                $flag = true;
            }
        }

        return $flag;
    }
}