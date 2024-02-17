<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<User>
 *
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UserRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function findSpecificUserById($id) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM user WHERE user.id = :id';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('id', $id);
        $result = $stmt->executeQuery()->fetchAllAssociative();

        return $result;
    }

    public function findSpecificUserByMail($user_mail) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'SELECT * FROM user WHERE user.user_mail = :user_mail';

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('user_mail', $user_mail);
        $result = $stmt->executeQuery()->fetchAllAssociative();

        return $result;
    }

    public function insert($user_name, $user_firstname, $user_mail, $user_birthdate, $user_password, $user_role) {

        $conn = $this->getEntityManager()->getConnection();

        $sql = 'INSERT INTO user (user_name, user_firstname, user_mail, user_birthdate, user_password, user_roles) VALUES (:user_name, :user_firstname, :user_mail, :user_birthdate, :user_password, :user_role)';

        $stmt = $conn->prepare($sql);

        $stmt->bindValue('user_name', $user_name);
        $stmt->bindValue('user_firstname', $user_firstname);
        $stmt->bindValue('user_mail', $user_mail);
        $stmt->bindValue('user_birthdate', $user_birthdate);
        $stmt->bindValue('user_password', $user_password);
        $stmt->bindValue('user_role', $user_role);

        $stmt->executeQuery();
    }

//    /**
//     * @return User[] Returns an array of User objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('u.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?User
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
