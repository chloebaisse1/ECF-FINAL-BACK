<?php

namespace App\Controller;

use App\Entity\CompteR;
use App\Repository\CompteRRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/compteR', name: 'app_api_compteR_')]
class CompteRController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private CompteRRepository $repository)
    {
    }


    #[Route(name: 'new', methods: 'POST')]
    public function new(): Response
    {
        $compteR = new CompteR();
        $compteR->setNom('boby');
        $compteR->setRace('lion');
        $compteR->setHabitat('savane');
        $compteR->setNourriture('boeuf');
        $compteR->setQuantitee('500grs');
        $compteR->setDate(new \DateTimeImmutable());


        $this->manager->persist($compteR);
        $this->manager->flush();

        // a stocker en base de données
        return $this->json(
            ['message' => 'Compte-rendu créé'],
            Response::HTTP_CREATED
        );
    }

    #[Route('/{id}', name: 'show', methods: 'GET')]
    public function show(int $id): Response
    {
        $compteR = $this->repository->findOneBy(['id' => $id]);

            if(!$compteR){
                throw new BadRequestException('Compte-rendu non trouvé pour {id} id');
            }
            return $this->json(
                ['message'=> "Compte-rendu trouvé : {$compteR->getNom()} pour {$compteR->getId()} id"]
            );
    }


    #[Route('/{id}', name: 'edit', methods: 'PUT')]
    public function edit(int $id): Response
    {
        $compteR = $this->repository->findOneBy(['id' => $id]);


        if(!$compteR){
            throw new BadRequestException('Compte-rendu non trouvé pour {id} id');
        }

        $compteR->setNom('Compte-rendu name updated');

        $this->manager->flush();

        return $this->redirectToRoute('app_api_compteR_show', ['id' => $compteR->getId()]);
    }




    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id): Response
    {
        $compteR = $this->repository->findOneBy(['id' => $id]);

        if(!$compteR){

            throw new BadRequestException('Compte-rendu non trouvé pour {id} id');
        }

        $this->manager->remove($compteR);
        $this->manager->flush();
        return $this->json(['message' => 'Compte-rendu supprimé'], Response::HTTP_NO_CONTENT);
    }
}
