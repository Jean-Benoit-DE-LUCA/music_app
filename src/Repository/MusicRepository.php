<?php

namespace App\Repository;

use App\Entity\Music;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Music>
 *
 * @method Music|null find($id, $lockMode = null, $lockVersion = null)
 * @method Music|null findOneBy(array $criteria, array $orderBy = null)
 * @method Music[]    findAll()
 * @method Music[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MusicRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Music::class);
    }

    public function getMusics() {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM music';

        $resultSet = $conn->executeQuery($sql);

        return $resultSet->fetchAllAssociative();
    }

    public function findSpecificMusicById($id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM music WHERE music.id = :id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('id', $id);
        $result = $stmt->executeQuery()->fetchAllAssociative();

        return $result;

    }

    public function findSpecificMusicByName($name) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM music WHERE music.music_name = :name';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('name', $name);
        $result = $stmt->executeQuery()->fetchAllAssociative();

        return $result;

    }

    public function findAllSongsByPlaylistId($playlist_id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT `music`.*, `playlist`.`playlist_song_order` FROM `music` 
                INNER JOIN `music_playlist` ON `music_playlist`.`music_id` = `music`.`id` 
                INNER JOIN `playlist` ON `playlist`.`id` = `music_playlist`.`playlist_id`
                WHERE `music_playlist`.`playlist_id` = :playlist_id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('playlist_id', $playlist_id);

        $result = $stmt->executeQuery()->fetchAllAssociative();

        return $result;
    }

    public function insertMusic($music_name, $created_at, $updated_at, $music_link, $music_video_id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'INSERT INTO music (music_name, created_at, updated_at, music_link, music_video_id) VALUES (:music_name, :created_at, :updated_at, :music_link, :music_video_id)';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('music_name', $music_name);
        $stmt->bindValue('created_at', $created_at);
        $stmt->bindValue('updated_at', $updated_at);
        $stmt->bindValue('music_link', $music_link);
        $stmt->bindValue('music_video_id', $music_video_id);

        $stmt->executeQuery();

        $lastInsertId = $conn->lastInsertId();

        return $lastInsertId;
    }

    public function deleteMusic($music_id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'DELETE FROM music WHERE music.id = :music_id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('music_id', $music_id);

        $stmt->executeQuery();
    }

    //public function 

//    /**
//     * @return Music[] Returns an array of Music objects
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

//    public function findOneBySomeField($value): ?Music
//    {
//        return $this->createQueryBuilder('m')
//            ->andWhere('m.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
