<?php

namespace App\Controller;

use App\Entity\User;

use App\Form\UserFormType;
use App\Repository\UserRepository;
use App\Functions\RegistrationFunctions;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;

class RegistrationController extends AbstractController
{

    private $userRepository;
    private $registrationFunctions;

    public function __construct(UserRepository $userRepository, RegistrationFunctions $registrationFunctions)
    {
        $this->userRepository = $userRepository;
        $this->registrationFunctions = $registrationFunctions;
    }

    #[Route('/registration', name: 'registration')]
    public function index(Session $session): Response
    {

        $userObject = new User();

        $userObject->setUserRoles(array('ROLE_USER'));

        $form = $this->createForm(UserFormType::class, $userObject);

        if (!empty($session->get('error_registration'))) {

            if ($session->get('timeError') < time() - 2) {

                $session->remove('error_registration');
                $session->remove('timeError');
            }
        }

        if (isset($_POST['user_form']['register_submit'])) {

            if (
                    (
                        $_POST['user_form']['user_name'] !== '' ||
                        $_POST['user_form']['user_firstname'] !== '' ||
                        $_POST['user_form']['user_mail'] !== '' ||
                        $_POST['user_form']['user_password']['first'] !== '' ||
                        $_POST['user_form']['user_password']['second'] !== ''
                    ) &&

                    (
                        $_POST['user_form']['user_password']['first'] == $_POST['user_form']['user_password']['second']
                    )
                ) {

                $user_name = $_POST['user_form']['user_name'];
                $user_firstname = $_POST['user_form']['user_firstname'];
                $user_mail = $_POST['user_form']['user_mail'];
                $user_password = $_POST['user_form']['user_password']['first'];

                $user_role = ["ROLE_USER"];

                $arrayStringsToCheck = [
                    $user_name,
                    $user_firstname,
                    $user_mail,
                    $user_password
                ];

                $flag = false;

                foreach ($arrayStringsToCheck as $string) {

                    if ($this->registrationFunctions->checkSpecialCharacter($string)) {

                        $flag = true;
                    }
                }

                if (!$flag) {

                    $year = $_POST['user_form']['user_birthdate']['year'];
                    $month = $_POST['user_form']['user_birthdate']['month'];
                    $day = $_POST['user_form']['user_birthdate']['day'];

                    $user_birthdate = $year . '-' . $month . '-' . $day;

                    $factory = new PasswordHasherFactory([
                        'common' => ['algorithm' => 'bcrypt']
                    ]);

                    $hasher = $factory->getPasswordHasher('common');
                    $user_password_hash = $hasher->hash($user_password);

                    $this->userRepository->insert($user_name, $user_firstname, $user_mail, $user_birthdate, $user_password_hash, json_encode($user_role));

                    $getUser = $this->userRepository->findSpecificUserByMail($user_mail);

                    $getUser[0]['jwt'] = JWTController::setJWT();

                    $session->set('user', $getUser);

                    return $this->redirectToRoute('music');
                }

            }

            else {

                $session->set('error_registration', 'Fields must be filled and passwords must match');
                $session->set('timeError', time());

                return $this->redirectToRoute('registration');
            }
        }

        return $this->render('registration/index.html.twig', [
            'userForm' => $form,
        ]);
    }
}
