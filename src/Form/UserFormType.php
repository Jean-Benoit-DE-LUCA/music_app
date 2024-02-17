<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('user_name', TextType::class, [
                'label' => 'Name:'
            ])
            ->add('user_firstname', TextType::class, [
                'label' => 'Firstname:'
            ])
            ->add('user_mail', EmailType::class, [
                'label' => 'Email:'
            ])
            ->add('user_birthdate', DateType::class, [
                'years' => range(1950, date('Y')),
                'label' => 'Birthdate:'
            ])
            ->add('user_password', RepeatedType::class, [
                'label' => false,
                'type' => PasswordType::class,
                'first_options' => ['label' => 'Password:', 'row_attr' => [
                    'class' => 'form_register_div'
                ]],
                'second_options' => ['label' => 'Confirm password:', 'row_attr' => [
                    'class' => 'form_register_div'
                ]]
            ])
            ->add('register_submit', SubmitType::class, [
                'label' => 'Register'
            ])
            //->add('user_roles')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
