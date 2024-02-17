<?php

namespace App\Entity;

use DateTime;

use App\Repository\MusicRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MusicRepository::class)]
class Music
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $music_name = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updated_at = null;

    /*#[ORM\OneToMany(targetEntity: MusicUser::class, mappedBy: 'music')]
    private Collection $user;*/

    #[ORM\Column(type: Types::TEXT)]
    private ?string $music_link = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $music_video_id = null;

    /*public function __construct()
    {
        $this->user = new ArrayCollection();
    }*/

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMusicName(): ?string
    {
        return $this->music_name;
    }

    public function setMusicName(string $music_name): static
    {
        $this->music_name = $music_name;

        return $this;
    }

    /*public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): static
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeInterface $updated_at): static
    {
        $this->updated_at = $updated_at;

        return $this;
    }*/

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

    /**
     * @return Collection<int, User>
     */
    /*
    public function getUser(): Collection
    {
        return $this->user;
    }

    public function addUser(User $user): static
    {
        if (!$this->user->contains($user)) {
            $this->user->add($user);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        $this->user->removeElement($user);

        return $this;
    }
    */
    public function getMusicLink(): ?string
    {
        return $this->music_link;
    }

    public function setMusicLink(string $music_link): static
    {
        $this->music_link = $music_link;

        return $this;
    }

    public function getMusicVideoId(): ?string
    {
        return $this->music_video_id;
    }

    public function setMusicVideoId(string $music_video_id): static
    {
        $this->music_video_id = $music_video_id;

        return $this;
    }
}
