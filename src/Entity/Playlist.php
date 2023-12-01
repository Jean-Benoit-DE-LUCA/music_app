<?php

namespace App\Entity;

use DateTime;
use App\Repository\PlaylistRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PlaylistRepository::class)]
class Playlist
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $playlist_name = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updated_at = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $playlist_song_order = null;

    /*#[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'playlists')]
    private Collection $users;

    public function __construct()
    {
        $this->users = new ArrayCollection();
    }*/

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlaylistName(): ?string
    {
        return $this->playlist_name;
    }

    public function setPlaylistName(string $playlist_name): static
    {
        $this->playlist_name = $playlist_name;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(string $created_at): static
    {   
        $dateTimeValue = new DateTime($created_at);
        $this->created_at = $dateTimeValue;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(string $updated_at): static
    {   
        $dateTimeValue = new DateTime($updated_at);
        $this->updated_at = $dateTimeValue;

        return $this;
    }

    public function getPLaylistSongOrder() 
    {
        return $this->playlist_song_order;
    }

    public function setPlaylistSongOrder(string $playlist_song_order) 
    {
        $this->playlist_song_order = $playlist_song_order;
        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    /*public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        $this->users->removeElement($user);

        return $this;
    }*/
}
