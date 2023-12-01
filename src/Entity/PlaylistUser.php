<?php

namespace App\Entity;

use App\Repository\PlaylistUserRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlaylistUserRepository::class)]
class PlaylistUser
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $playlist_id = null;

    #[ORM\Column]
    private ?int $user_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlaylistId(): ?int
    {
        return $this->playlist_id;
    }

    public function setPlaylistId(int $playlist_id): static
    {
        $this->playlist_id = $playlist_id;

        return $this;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }
}
