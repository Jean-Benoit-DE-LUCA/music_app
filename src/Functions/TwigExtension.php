<?php

namespace App\Functions;

class TwigExtension extends \Twig\Extension\AbstractExtension {

    public function getFunctions()
    {
        return [
            new \Twig\TwigFunction('ucWordsFunc', function($string = '') {
                return ucwords($string);
            }),
            new \Twig\TwigFunction('pathInfoBackAnchor', function() {

                if ($_SERVER['PATH_INFO'] == '/music') {

                    return false;
                }

                else {

                    return true;
                }
            })
        ];
    }
}