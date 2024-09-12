<?php

namespace App\Controller;

use App\Entity\Avis;
use App\Repository\AvisRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/avis', name: 'app_api_avis_')]
class AvisController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private AvisRepository $repository)
    {
    }


    #[Route(name: 'new', methods: 'POST')]
    public function new(): Response
    {
        $avis = new Avis();
        $avis->setNom('John');
        $avis->setPrenom('Doe');
        $avis->setMessage('Le zoo est magnifique');


        $this->manager->persist($avis);
        $this->manager->flush();

        // a stocker en base de données
        return $this->json(
            ['message' => 'Avis créé'],
            Response::HTTP_CREATED
        );
    }

    #[Route('/{id}', name: 'show', methods: 'GET')]
    public function show(int $id): Response
    {
        $avis = $this->repository->findOneBy(['id' => $id]);

            if(!$avis){
                throw new BadRequestException('Avis non trouvé pour {id} id');
            }
            return $this->json(
                ['message'=> "Avis trouvé : {$avis->getNom()} pour {$avis->getId()} id"]
            );
    }






    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id): Response
    {
        $avis = $this->repository->findOneBy(['id' => $id]);

        if(!$avis){

            throw new BadRequestException('Avis non trouvé pour {id} id');
        }

        $this->manager->remove($avis);
        $this->manager->flush();
        return $this->json(['message' => 'Avis supprimé'], Response::HTTP_NO_CONTENT);
    }
}
