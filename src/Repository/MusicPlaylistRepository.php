<?php

namespace App\Repository;

use App\Entity\MusicPlaylist;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<MusicPlaylist>
 *
 * @method MusicPlaylist|null find($id, $lockMode = null, $lockVersion = null)
 * @method MusicPlaylist|null findOneBy(array $criteria, array $orderBy = null)
 * @method MusicPlaylist[]    findAll()
 * @method MusicPlaylist[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MusicPlaylistRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MusicPlaylist::class);
    }

    public function insertMusicPlaylist($music_id, $playlist_id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'INSERT INTO music_playlist (music_id, playlist_id) VALUES (:music_id, :playlist_id)';

        $stmt = $conn->prepare($sql);

        $stmt->bindValue('music_id', $music_id);
        $stmt->bindValue('playlist_id', $playlist_id);

        $stmt->executeQuery();
    }

    public function deleteMusicPlaylist($music_id, $playlist_id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'DELETE FROM music_playlist WHERE music_playlist.music_id = :music_id AND music_playlist.playlist_id = :playlist_id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('music_id', $music_id);
        $stmt->bindValue('playlist_id', $playlist_id);

        $stmt->executeQuery();
    }

//    /**
//     * @return MusicPlaylist[] Returns an array of MusicPlaylist objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('m.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?MusicPlaylist
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
