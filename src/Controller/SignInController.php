<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\SignInFormType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;
use Symfony\Component\HttpFoundation\Session\Session;
use App\Controller\JWTController;

class SignInController extends AbstractController
{

    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    //

    #[Route('/signin', name: 'sign_in')]
    public function index(Session $session): Response
    {   

        $userObject = new User();

        $form = $this->createForm(SignInFormType::class, $userObject);

        
        if (isset($_POST['sign_in_form'])) {

            $user_mail = $_POST['sign_in_form']['user_mail'];
            $user_password = $_POST['sign_in_form']['user_password'];

            if ($user_mail !== '' ||
                $user_password !== '') {

                    $getUser = $this->userRepository->findSpecificUserByMail($user_mail);

                    if (!empty($getUser)) {

                        $factory = new PasswordHasherFactory([
                            'common' => ['algorithm' => 'bcrypt']
                        ]);
                        $hasher = $factory->getPasswordHasher('common');

                        $flag = $hasher->verify($getUser[0]['user_password'], $user_password);

                        if ($flag) {

                            $getUser[0]['jwt'] = JWTController::setJWT();

                            $session->set('user', $getUser);

                            setcookie("timeLogout", time() + 1800);

                            return $this->redirectToRoute('music');
                        }
                    }

                    else {

                        $session->set('error', 'User not registered');
                        $session->set('timeError', time());

                        return $this->redirectToRoute('sign_in');
                    }

                }
        }

        else {

            if ($session->get('timeError') < time() - 2) {

                $session->remove('error');
                $session->remove('timeError');
            }

            return $this->render('sign_in/index.html.twig', [
                'signinForm' => $form,
            ]);
        }

        return $this->render('sign_in/index.html.twig', [
            'signinForm' => $form,
        ]);

    }

    #[Route('/logout', name: 'logout')]
    public function logout(Session $session) {

        $session->clear();

        return $this->redirectToRoute('music');
    }
}
