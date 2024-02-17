<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $user_name = null;

    #[ORM\Column(length: 255)]
    private ?string $user_firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $user_mail = null;

    #[ORM\Column(length: 255)]
    private ?string $user_birthdate = null;

    #[ORM\Column(length: 255)]
    private ?string $user_password = null;

    /*#[ORM\OneToMany(targetEntity: MusicUser::class, mappedBy: 'user')]
    private Collection $music;*/

    #[ORM\Column(type: Types::JSON)]
    private array $user_roles = [];

    /*#[ORM\ManyToMany(targetEntity: Playlist::class, mappedBy: 'users')]
    private Collection $playlists;

    public function __construct()
    {
        $this->playlists = new ArrayCollection();
    }*/

    /*public function __construct()
    {
        $this->music = new ArrayCollection();
    }*/

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserName(): ?string
    {
        return $this->user_name;
    }

    public function setUserName(string $user_name): static
    {
        $this->user_name = $user_name;

        return $this;
    }

    public function getUserFirstname(): ?string
    {
        return $this->user_firstname;
    }

    public function setUserFirstname(string $user_firstname): static
    {
        $this->user_firstname = $user_firstname;

        return $this;
    }

    public function getUserMail(): ?string
    {
        return $this->user_mail;
    }

    public function setUserMail(string $user_mail): static
    {
        $this->user_mail = $user_mail;

        return $this;
    }

    public function getUserBirthdate(): ?string
    {
        return $this->user_birthdate;
    }

    public function setUserBirthdate(string $user_birthdate): static
    {
        $this->user_birthdate = $user_birthdate;

        return $this;
    }

    public function getUserPassword(): ?string
    {
        return $this->user_password;
    }

    public function setUserPassword(string $user_password): static
    {
        $this->user_password = $user_password;

        return $this;
    }
    
    /**
     * @return Collection<int, Music>
     */

     /*
    public function getMusic(): Collection
    {
        return $this->music;
    }

    public function addMusic(Music $music): static
    {
        if (!$this->music->contains($music)) {
            $this->music->add($music);
            $music->addUser($this);
        }

        return $this;
    }

    public function removeMusic(Music $music): static
    {
        if ($this->music->removeElement($music)) {
            $music->removeUser($this);
        }

        return $this;
    }
    */
    public function getUserRoles(): array
    {   
        $user_roles = $this->user_roles;
        $user_roles[] = 'ROLE_USER';

        return array_unique($user_roles);
    }

    public function setUserRoles(array $user_roles): static
    {
        $this->user_roles = $user_roles;

        return $this;
    }

    /**
     * @return Collection<int, Playlist>
     */
    /*public function getPlaylists(): Collection
    {
        return $this->playlists;
    }

    public function addPlaylist(Playlist $playlist): static
    {
        if (!$this->playlists->contains($playlist)) {
            $this->playlists->add($playlist);
            $playlist->addUser($this);
        }

        return $this;
    }

    public function removePlaylist(Playlist $playlist): static
    {
        if ($this->playlists->removeElement($playlist)) {
            $playlist->removeUser($this);
        }

        return $this;
    }*/
}
