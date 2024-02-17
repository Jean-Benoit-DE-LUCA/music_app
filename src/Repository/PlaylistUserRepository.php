<?php

namespace App\Repository;

use App\Entity\PlaylistUser;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<PlaylistUser>
 *
 * @method PlaylistUser|null find($id, $lockMode = null, $lockVersion = null)
 * @method PlaylistUser|null findOneBy(array $criteria, array $orderBy = null)
 * @method PlaylistUser[]    findAll()
 * @method PlaylistUser[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlaylistUserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PlaylistUser::class);
    }

    public function insert($playlist_id, $user_id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'INSERT INTO playlist_user (playlist_id, user_id) VALUES (:playlist_id, :user_id)';

        $stmt = $conn->prepare($sql);

        $stmt->bindValue('playlist_id', $playlist_id);
        $stmt->bindValue('user_id', $user_id);

        $stmt->executeQuery();
    }

    public function deletePlaylistUser($playlist_id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'DELETE FROM playlist_user WHERE playlist_user.playlist_id = :playlist_id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('playlist_id', $playlist_id);

        $stmt->executeQuery();
    }

//    /**
//     * @return PlaylistUser[] Returns an array of PlaylistUser objects
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

//    public function findOneBySomeField($value): ?PlaylistUser
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
