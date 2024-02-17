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

                $firstPart = str_replace('/api/music/playlist/', '', $_SERVER['PATH_INFO']);
                $getNumbers = str_replace('/delete/', ',', $firstPart);
                $arrayPlaylistIdMusicId = explode(',', $getNumbers);

                $first = str_replace('{playlist_id}', $arrayPlaylistIdMusicId[0], '/api/music/playlist/{playlist_id}/delete/{music_id}');
                $result = str_replace('{music_id}', $arrayPlaylistIdMusicId[1], $first);

                if ($_SERVER['PATH_INFO'] == $result) {

                    $flag = true;
                    break;
                }
            }

            
            if (str_contains($value, '{playlist_id}')) {

                if ($_SERVER['PATH_INFO'] == str_replace('{playlist_id}', '', '/music/playlist/{playlist_id}') . preg_replace('/[^0-9]/', '', $_SERVER['PATH_INFO'])) {

                    $flag = true;
                    break;
                }

                else if ($_SERVER['PATH_INFO'] == str_replace('{playlist_id}', '', '/music/playlist/edit/{playlist_id}') . preg_replace('/[^0-9]/', '', $_SERVER['PATH_INFO'])) {

                    $flag = true;
                    break;
                }

                else if ($_SERVER['PATH_INFO'] == str_replace('{playlist_id}', '', '/api/music/playlist/delete/{playlist_id}') . preg_replace('/[^0-9]/', '', $_SERVER['PATH_INFO'])) {

    
                    $flag = true;
                    break;
                }
            }

            if ($_SERVER['PATH_INFO'] == $value) {

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