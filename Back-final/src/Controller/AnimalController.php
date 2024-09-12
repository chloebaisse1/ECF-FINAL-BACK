<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Repository\AnimalRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/animal', name: 'app_api_animal_')]
class AnimalController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private AnimalRepository $repository)
    {
    }


    #[Route(name: 'new', methods: 'POST')]
    public function new(): Response
    {
        $animal = new Animal();
        $animal->setNom('boby');
        $animal->setRace('lion');
        $animal->setHabitat('Savane');
        $animal->setEtat('en forme');

        $this->manager->persist($animal);
        $this->manager->flush();

        // a stocker en base de données
        return $this->json(
            ['message' => 'Animal créé'],
            Response::HTTP_CREATED
        );
    }

    #[Route('/{id}', name: 'show', methods: 'GET')]
    public function show(int $id): Response
    {
        $animal = $this->repository->findOneBy(['id' => $id]);

            if(!$animal){
                throw new BadRequestException('Animal non trouvé pour {id} id');
            }
            return $this->json(
                ['message'=> "Animal trouvé : {$animal->getName()} pour {$animal->getId()} id"]
            );
    }


    #[Route('/{id}', name: 'edit', methods: 'PUT')]
    public function edit(int $id): Response
    {
        $animal = $this->repository->findOneBy(['id' => $id]);


        if(!$animal){
            throw new BadRequestException('Animal non trouvé pour {id} id');
        }

        $animal->setName('Animal name updated');

        $this->manager->flush();

        return $this->redirectToRoute('app_api_animal_show', ['id' => $animal->getId()]);
    }




    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id): Response
    {
        $animal = $this->repository->findOneBy(['id' => $id]);

        if(!$animal){

            throw new BadRequestException('Animal non trouvé pour {id} id');
        }

        $this->manager->remove($animal);
        $this->manager->flush();
        return $this->json(['message' => 'Animal supprimé'], Response::HTTP_NO_CONTENT);
    }
}
