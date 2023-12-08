<?php

namespace App\Functions;

class ConfigFunctions {

    private $urls = [
        '/api/music/addmusicplaylist',
        '/api/music/playlist/{playlist_id}/delete/{music_id}',
        '/api/music/playlist/delete/{playlist_id}',
        
        '/',

        '/logout',

        '/music',
        '/music/playlist',
        '/music/playlist/new',
        '/music/playlist/{playlist_id}',
        '/music/playlist/edit/{playlist_id}',

        '/registration',

        '/signin'
    ];

    public function checkUrl() {

        $flag = false;

        foreach ($this->urls as $value) {

            if ($value == '/api/music/playlist/{playlist_id}/delete/{music_id}') {

                $firstPart = str_replace('/api/music/playlist/', '', $_SERVER['REQUEST_URI']);
                $getNumbers = str_replace('/delete/', ',', $firstPart);
                $arrayPlaylistIdMusicId = explode(',', $getNumbers);

                $first = str_replace('{playlist_id}', $arrayPlaylistIdMusicId[0], '/api/music/playlist/{playlist_id}/delete/{music_id}');

                if (count($arrayPlaylistIdMusicId) > 1) {

                    $result = str_replace('{music_id}', $arrayPlaylistIdMusicId[1], $first);
                }

                else {

                    $result = "undefined";
                }

                if ($_SERVER['REQUEST_URI'] == $result) {

                    $flag = true;
                    break;
                }

            }

            
            if (str_contains($value, '{playlist_id}')) {

                if ($_SERVER['REQUEST_URI'] == str_replace('{playlist_id}', '', '/music/playlist/{playlist_id}') . preg_replace('/[^0-9]/', '', $_SERVER['REQUEST_URI'])) {

                    $flag = true;
                    break;
                }

                else if ($_SERVER['REQUEST_URI'] == str_replace('{playlist_id}', '', '/music/playlist/edit/{playlist_id}') . preg_replace('/[^0-9]/', '', $_SERVER['REQUEST_URI'])) {

                    $flag = true;
                    break;
                }

                else if ($_SERVER['REQUEST_URI'] == str_replace('{playlist_id}', '', '/api/music/playlist/delete/{playlist_id}') . preg_replace('/[^0-9]/', '', $_SERVER['REQUEST_URI'])) {

    
                    $flag = true;
                    break;
                }
            }

            if ($_SERVER['REQUEST_URI'] == $value) {

                $flag = true;
                break;
            }
        }

        return $flag;
    }

    public function checkLogout() {

        if (isset($_COOKIE['timeLogout'])) {

            if ($_COOKIE['timeLogout'] - time() <= 0) {
        
                setcookie('timeLogout', '', time()  - 3600);
                header('Location: /logout');
                die();
            }
        }
    }
}