<?php

namespace App\Repository;

use App\Entity\Playlist;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Playlist>
 *
 * @method Playlist|null find($id, $lockMode = null, $lockVersion = null)
 * @method Playlist|null findOneBy(array $criteria, array $orderBy = null)
 * @method Playlist[]    findAll()
 * @method Playlist[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlaylistRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Playlist::class);
    }

    public function getPlaylists($user_id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT `playlist`.* FROM `playlist_user` INNER JOIN `user` ON `user`.`id` = `playlist_user`.`user_id` INNER JOIN `playlist` ON `playlist`.`id` = `playlist_user`.`playlist_id` WHERE `playlist_user`.`user_id` = :user_id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('user_id', $user_id);

        $result = $stmt->executeQuery()->fetchAllAssociative();

        return $result;
    }

    public function findPlaylist($playlist_id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM `playlist` WHERE `playlist`.`id` = :playlist_id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('playlist_id', $playlist_id);

        $result = $stmt->executeQuery()->fetchAllAssociative();

        return $result;
    }

    public function updatePlaylistSongOrder($playlist_id, $playlist_song_order) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'UPDATE `playlist` SET `playlist`.`playlist_song_order` = :playlist_song_order WHERE `playlist`.`id` = :playlist_id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('playlist_song_order', $playlist_song_order);
        $stmt->bindValue('playlist_id', $playlist_id);

        $stmt->executeQuery();
    }

    public function deletePlaylist($playlist_id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'DELETE FROM `playlist` WHERE `playlist`.`id` = :playlist_id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('playlist_id', $playlist_id);

        $stmt->executeQuery();
    }

//    /**
//     * @return Playlist[] Returns an array of Playlist objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Playlist
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
