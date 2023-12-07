<?php

namespace App\Controller;

use App\Entity\Music;
use App\Entity\MusicUser;
use App\Entity\Playlist;
use App\Entity\PlaylistUser;
use App\Form\MusicFormType;
use App\Form\PlaylistNewFormType;
use App\Form\SearchMusicFormType;
use App\Functions\MusicFunctions;
use App\Repository\MusicRepository;
use App\Repository\MusicUserRepository;
use App\Repository\PlaylistRepository;
use App\Repository\PlaylistUserRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Form\ClickableInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Session\Session;
use App\Controller\JWTController;
use App\Form\PlaylistGetFormType;
use App\Form\SignInFormType;
use App\Repository\MusicPlaylistRepository;
use ConfigFile;
use DateTime;
use Exception;

class MusicController extends AbstractController
{
    private $em;
    private $musicRepository;
    private $musicPlaylistRepository;
    private $userRepository;
    private $playlistRepository;
    private $playlistUserRepository;

    public function __construct(MusicRepository $musicRepository,
    MusicPlaylistRepository $musicPlaylistRepository, 
    UserRepository $userRepository,
    PlaylistRepository $playlistRepository,
    PlaylistUserRepository $playlistUserRepository,
    EntityManagerInterface $em
    
    )
    {
        $this->musicRepository = $musicRepository;
        $this->musicPlaylistRepository = $musicPlaylistRepository;
        $this->userRepository = $userRepository;
        $this->playlistRepository = $playlistRepository;
        $this->playlistUserRepository = $playlistUserRepository;
        $this->em = $em;
    }

    #[Route('/', name: 'home')]
    public function home() {

        return $this->redirectToRoute('music');
    }

    //


    #[Route('/music', name: 'music')]
    public function index(Session $session): Response
    {   

        if ($session->get('timeError') < time() - 2) {

            $session->remove('error_music');
            $session->remove('timeError');
        }

        $form = $this->createForm(SearchMusicFormType::class);

        if (isset($_POST['search_music_form'])) {

            $filteredSearchName = str_replace(' ', '%20', $_POST['search_music_form']['search_music']);

            /*include_once '../ConfigFile.php';

            $curl = curl_init();

            $url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=' . $filteredSearchName . '&type=video&key=' . ConfigFile::$apiYoutubeKey;

            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

            $response = curl_exec($curl);

            $json = json_decode($response);

            $generateUrl = 'https://www.youtube.com/embed/' . $json->items[0]->id->videoId . '?enablejsapi=1';
            $generateTitle = $json->items[0]->snippet->title;
            $generateVideoId = $json->items[0]->id->videoId;*/

            $generateUrl = 'https://www.youtube.com/embed/ujNeHIo7oTE?enablejsapi=1';
            $generateTitle = 'u2 - TEST';
            $generateVideoId = 'ujNeHIo7oTE';

            if (isset($session->get('user')[0]['id'])) {

                $getPlaylists = $getPlaylists = $this->playlistRepository->getPlaylists($session->get('user')[0]['id']);

                return $this->render('music/index.html.twig', [
                    'searchForm' => $form->createView(),
                    'musicLink' => $generateUrl,
                    'searchMusic' => $generateTitle,
                    'videoId' => $generateVideoId,
                    'getPlaylists' => $getPlaylists
                ]);
            }

            else {

                return $this->render('music/index.html.twig', [
                    'searchForm' => $form->createView(),
                    'musicLink' => $generateUrl,
                    'searchMusic' => $generateTitle,
                    'videoId' => $generateVideoId
                ]);
            }

        }



        else if (isset($_POST['form--add--music--playlist--submit--button'])) {

            $music_name = $_POST['hidden--music--generate--title'];
            $music_link = $_POST['hidden--music--generate--url'];
            $playlist_id = $_POST['form--add--music--playlist--select'];
            $music_video_id = $_POST['hidden--music--generate--video--id'];

            $currentDateTime = new Datetime(date('Y-m-d H:i:s'));

            $created_at = $currentDateTime->format('Y-m-d H:i:s');
            $updated_at = $currentDateTime->format('Y-m-d H:i:s');

            $lastInsertedIdMusic = $this->musicRepository->insertMusic($music_name, $created_at, $updated_at, $music_link, $music_video_id);

            $insertMusicPlaylist = $this->musicPlaylistRepository->insertMusicPlaylist($lastInsertedIdMusic, $playlist_id);
        }

        return $this->render('music/index.html.twig', [
            'searchForm' => $form->createView(),
            'musicLink' => '',
            'searchMusic' => ''
        ]);
    }

    #[Route('/api/music/addmusicplaylist')]
    public function addMusicToPlaylist(Request $request) {

        if (JWTController::checkJWT($request->headers->get('x-csrf-token'))) {

            try {

                $currentDateTime = new Datetime(date('Y-m-d H:i:s'));
    
                $created_at = $currentDateTime->format('Y-m-d H:i:s');
                $updated_at = $currentDateTime->format('Y-m-d H:i:s');
    
                $result = json_decode($request->getContent(), true);

    
                $lastInsertedIdMusic = $this->musicRepository->insertMusic($result['music_name'], $created_at, $updated_at, $result['music_link'], $result['music_video_id']);
    
                $insertMusicPlaylist = $this->musicPlaylistRepository->insertMusicPlaylist($lastInsertedIdMusic, $result['playlist_id']);

                $getPlaylist = $this->playlistRepository->findPlaylist($result['playlist_id']);

                if ($getPlaylist[0]['playlist_song_order'] !== null) {

                    $arrayPlaylistSongOrder = explode(',', $getPlaylist[0]['playlist_song_order']);
                    $arrayPlaylistSongOrder[] = $lastInsertedIdMusic;

                    $this->playlistRepository->updatePlaylistSongOrder($result['playlist_id'], implode(',', $arrayPlaylistSongOrder));
                }

                else {

                    $arrayPlaylistSongOrder = [];
                    $arrayPlaylistSongOrder[] = $lastInsertedIdMusic;

                    $this->playlistRepository->updatePlaylistSongOrder($result['playlist_id'], implode(',', $arrayPlaylistSongOrder));

                }
    
                return new JsonResponse([
                    'success' => 'Song added successfully to playlist'
                ]);
            }            
            
    
            catch (Exception $e) {
    
                return new JsonResponse([
                    'error' => 'Error during adding process'
                ]);
            }
        }

        else {

            return new JsonResponse([
                'error' => 'Authentication error'
            ]);
        }

    }

    //

    #[Route('/music/playlist',name: 'music_playlist')]
    public function indexPlaylist(Session $session) 
    {
        if (empty($session->get('user'))) {

            $session->set('error_music', 'You must be logged to access this area.');
            $session->set('timeError', time());

            return $this->redirectToRoute('music');
        }

        else {

            $form = $this->createForm(PlaylistGetFormType::class);

            if (isset($_POST['playlist_get_form'])) {

                if (!empty($session->get('success'))) {

                    if ($session->get('timeError') < time() - 2) {

                        $session->remove('success');
                        $session->remove('timeError');
                    }
                }

                $getPlaylists = $this->playlistRepository->getPlaylists($session->get('user')[0]['id']);

                return $this->render('music/playlist/index.html.twig', [
                    'urlContainsPlaylist' => str_contains($_SERVER['REQUEST_URI'], '/playlist'),
                    'getPlaylistsForm' => $form,
                    'getPlaylists' => $getPlaylists,
                ]);
            }

            return $this->render('music/playlist/index.html.twig', [
                'urlContainsPlaylist' => str_contains($_SERVER['REQUEST_URI'], '/playlist'),
                'getPlaylistsForm' => $form,
            ]);
        }
        
    }

    //

    #[Route('/music/playlist/new', name: 'music_playlist_new')]
    public function addPlaylist(Session $session) 
    {

        if (empty($session->get('user'))) {

            $session->set('error', 'You must be logged to access this area.');
            $session->set('timeError', time());

            return $this->redirectToRoute('sign_in');
        }
        

        else if (!empty($session->get('user'))) {

            $currentDateTime = new DateTime();

            $playListObject = new Playlist();
            $playListObject->setCreatedAt($currentDateTime->format('Y-m-d H:m:s'));
            $playListObject->setUpdatedAt($currentDateTime->format('Y-m-d H:m:s'));

            $form = $this->createForm(PlaylistNewFormType::class, $playListObject);



            if (empty($_POST)) {

                if ($session->get('timeError') < time() - 2) {

                    $session->remove('error_new');
                    $session->remove('timeError');

                    return $this->render('music/playlist/new.html.twig', [
                        'playlistNewForm' => $form
                    ]);
                }
            }

            else if (isset($_POST['playlist_new_form'])) {

                $userSession = $session->get('user');

                if (isset($userSession[0]['id'])) {

                    $playlist_name = $_POST['playlist_new_form']['playlist_name'];

                    if ($playlist_name !== '') {

                        if (JWTController::checkJWT($session->get('user')[0]['jwt'])) {

                            $playListObject->setPlaylistName($playlist_name);

                            $this->em->persist($playListObject);
                            $this->em->flush();

                            $lastInsertedId = $playListObject->getId();

                            $this->playlistUserRepository->insert($lastInsertedId, $userSession[0]['id']);

                            $session->set('success', 'New playlist created');
                            $session->set('timeError', time());

                            return $this->redirectToRoute('music_playlist');
                        }

                        else if (!JWTController::checkJWT($session->get('user')[0]['jwt'])) {

                            $session->set('error_new', 'Authentication error, please sign in again');
                            $session->set('timeError', time());

                            return $this->redirectToRoute('music_playlist_new');
                        }
                    }
                }
            }
        }

        return $this->render('music/playlist/new.html.twig', [
            'playlistNewForm' => $form
        ]);


    }

    //

    #[Route('/music/playlist/{playlist_id}', name: 'music_playlist_playlist_id')]
    public function playlistId(int $playlist_id) {

        $getSongs = $this->musicRepository->findAllSongsByPlaylistId($playlist_id);
        $playlist = $this->playlistRepository->findPlaylist($playlist_id);

        if (!empty($getSongs)) {

            $arraySongsOrder = explode(',', $getSongs[0]['playlist_song_order']);
                
            $musicFunctionObj = new MusicFunctions();
            $orderedResult = $musicFunctionObj->orderSongs($getSongs, $arraySongsOrder);
            
            $getSongs = $orderedResult;
        }

        return $this->render('music/playlist/playlist_id/index.html.twig', [
            'getSongs' => $getSongs,
            'playlist_name' => $playlist[0]['playlist_name']
        ]);
    }
    
    //

    #[Route('/music/playlist/edit/{playlist_id}', name: 'music_playlist_edit_playlist_id')]
    public function editPlaylistId(Session $session, int $playlist_id) {

        $userSession = $session->get('user');

        if (isset($userSession[0]['id'])) {

            if ($session->get('timeError') < time() - 2) {

                $session->remove('error_edit_playlist');
                $session->remove('success');
                $session->remove('timeError');
            }

            $getSongs = $this->musicRepository->findAllSongsByPlaylistId($playlist_id);
            $getPlaylist = $this->playlistRepository->findPlaylist($playlist_id);

            if (isset($_POST['submit--new--order--playlist'])) {

                if (isset($_POST['hidden--song--id'])) {

                    if (count($_POST['hidden--song--id']) == $_POST['hidden--total--song']) {

                        $arrayNewOrder = [];

                        foreach ($_POST['hidden--song--id'] as $key => $value) {

                            $arrayNewOrder[] = $value;
                        }

                        $this->playlistRepository->updatePlaylistSongOrder($playlist_id, implode(',', $arrayNewOrder));

                        $session->set('success', 'Playlist songs order updated successfully');
                        $session->set('timeError', time());

                        return $this->redirectToRoute('music_playlist_edit_playlist_id', ['playlist_id' => $playlist_id]);
                    }

                    else {

                        $session->set('error_edit_playlist', 'You have to put all your songs in the new playlist order section');
                        $session->set('timeError', time());

                        return $this->redirectToRoute('music_playlist_edit_playlist_id', ['playlist_id' => $playlist_id]);
                    }
                }

                else if (!isset($_POST['hidden--song--id'])) {

                    $session->set('error_edit_playlist', 'You have to put all your songs in the new playlist order section');
                    $session->set('timeError', time());

                    return $this->redirectToRoute('music_playlist_edit_playlist_id', ['playlist_id' => $playlist_id]);
                }
            }

            if (!empty($getSongs)) {

                $arraySongsOrder = explode(',', $getSongs[0]['playlist_song_order']);
                
                $musicFunctionObj = new MusicFunctions();
                $orderedResult = $musicFunctionObj->orderSongs($getSongs, $arraySongsOrder);
                
                $getSongs = $orderedResult;
            }

            return $this->render('music/playlist/edit/index.html.twig', [
                'getSongs' => $getSongs,
                'countSongs' => count($getSongs),
                'getPlaylist' => $getPlaylist[0]
            ]);

        }

        else {

            $session->set('error', 'You must be logged to access this area.');
            $session->set('timeError', time());

            return $this->redirectToRoute('music');
        }
    }

    //

    #[Route('/api/music/playlist/{playlist_id}/delete/{music_id}', name: 'music_playlist_playlist_id_delete_music_id')]
    public function deleteMusicFromPlaylist(Request $request, $playlist_id, $music_id) {

        $flag = false;

        if (JWTController::checkJWT($request->headers->get('x-csrf-token'))) {

            $deleteMusic = $this->musicRepository->deleteMusic($music_id);
            $deleteMusicPlaylist = $this->musicPlaylistRepository->deleteMusicPlaylist($music_id, $playlist_id);

            $getPlaylist = $this->playlistRepository->findPlaylist($playlist_id);

            if (!empty($getPlaylist[0]['playlist_song_order'])) {

                $arraySongsOrder = explode(',', $getPlaylist[0]['playlist_song_order']);
                
                foreach ($arraySongsOrder as $key => $value) {

                    if ($value == $music_id) {

                        unset($arraySongsOrder[$key]);
                    }
                }

                if (empty($arraySongsOrder)) {

                    $this->playlistRepository->updatePlaylistSongOrder($playlist_id, NULL);
                }

                else {

                    $this->playlistRepository->updatePlaylistSongOrder($playlist_id, implode(',', $arraySongsOrder));
                }
            }

            $flag = true;
        
        }

        else {

            $flag = false;
        }

        

        return new JsonResponse([
            'flag' => $flag
        ]);
    }

    //

    #[Route('/api/music/playlist/delete/{playlist_id}')]
    public function deletePlaylist(Request $request, $playlist_id) {

        $flag = false;

        if (JWTController::checkJWT($request->headers->get('x-csrf-token'))) {

            $getSongs = $this->musicRepository->findAllSongsByPlaylistId($playlist_id);

            foreach($getSongs as $key => $song) {

                $deleteMusic = $this->musicRepository->deleteMusic($song['id']);
                $deleteMusicPlaylist = $this->musicPlaylistRepository->deleteMusicPlaylist($song['id'], $playlist_id);
            }
            

            $deletePlaylist = $this->playlistRepository->deletePlaylist($playlist_id);
            $deletePlaylistUser = $this->playlistUserRepository->deletePlaylistUser($playlist_id);

            $flag = true;
        }

        else {

            $flag = false;
        }

        return new JsonResponse([
            'flag' => $flag
        ]);
    }
}
