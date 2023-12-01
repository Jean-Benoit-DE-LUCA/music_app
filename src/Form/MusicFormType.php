<?php

namespace App\Form;

use App\Entity\Music;

use DateTime;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class MusicFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {

        $currentDateTime = new Datetime(date('Y-m-d H:i:s'));

        $builder
            ->add('music_name', TextType::class, [
                'attr' => [
                    'class' => 'music_name_input'
                ]
            ])

            ->add('created_at', HiddenType::class, [
                'data' => $currentDateTime->format('Y-m-d H:i:s')
            ])

            ->add('updated_at', HiddenType::class, [
                'data' => $currentDateTime->format('Y-m-d H:i:s')
            ])

            ->add('music_link', TextType::class)

            ->add('submit_form', SubmitType::class, [
                'label' => 'Ajouter'
            ])
            //->add('user')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Music::class,
        ]);
    }
}
