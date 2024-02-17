<?php

namespace App\Functions;

class MusicFunctions {

    public function orderSongs($arrayCurrentSongs, $arrayNewOrderSongs) {
            
        $newArraySongsOrder = [];

        for ($i = 0; $i < count($arrayNewOrderSongs); $i++) {

            for ($y = 0; $y < count($arrayCurrentSongs); $y++) {

                if ($arrayCurrentSongs[$y]['id'] != $arrayNewOrderSongs[$i]) {

                    continue;
                }

                $newArraySongsOrder[] = $arrayCurrentSongs[$y];
            }
        }
        
        $arrayCurrentSongs = $newArraySongsOrder;

        return $arrayCurrentSongs;
    }
}