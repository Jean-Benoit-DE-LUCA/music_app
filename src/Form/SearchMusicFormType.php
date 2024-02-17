<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ButtonType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SearchMusicFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('search_music', TextType::class, [
                'label' => false,
                'attr' => [
                    'placeholder' => 'Search your music...'
                ],
                'row_attr' => [
                    'class' => 'form_register_div'
                ]
            ])
            ->add('submit_search', SubmitType::class, [
                'label' => 'Search',
                'row_attr' => [
                    'class' => 'form_register_div'
                ]
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
