<?php

namespace App\Entity;

use App\Repository\MusicPlaylistRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MusicPlaylistRepository::class)]
class MusicPlaylist
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $music_id = null;

    #[ORM\Column]
    private ?int $playlist_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMusicId(): ?int
    {
        return $this->music_id;
    }

    public function setMusicId(int $music_id): static
    {
        $this->music_id = $music_id;

        return $this;
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
}
