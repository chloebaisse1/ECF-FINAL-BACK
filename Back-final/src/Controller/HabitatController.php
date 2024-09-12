<?php

namespace App\Controller;

use App\Entity\Habitat;
use App\Repository\HabitatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/habitat', name: 'app_api_habitat_')]
class HabitatController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private HabitatRepository $repository)
    {
    }


    #[Route(name: 'new', methods: 'POST')]
    public function new(): Response
    {
        $habitat = new Habitat();
        $habitat->setName('Savane');
        $habitat->setDescription('Habitat de la savane');
        $habitat->setAnimaux('Lion, Girafe, Elephants');
        $habitat->setCreatedAt(new \DateTimeImmutable());

        $this->manager->persist($habitat);
        $this->manager->flush();

        // a stocker en base de données
        return $this->json(
            ['message' => 'Habitat créé'],
            Response::HTTP_CREATED
        );
    }

    #[Route('/{id}', name: 'show', methods: 'GET')]
    public function show(int $id): Response
    {
        $habitat = $this->repository->findOneBy(['id' => $id]);

            if(!$habitat){
                throw new BadRequestException('Habitat non trouvé pour {id} id');
            }
            return $this->json(
                ['message'=> "Habitat trouvé : {$habitat->getName()} pour {$habitat->getId()} id"]
            );
    }


    #[Route('/{id}', name: 'edit', methods: 'PUT')]
    public function edit(int $id): Response
    {
        $habitat = $this->repository->findOneBy(['id' => $id]);


        if(!$habitat){
            throw new BadRequestException('Habitat non trouvé pour {id} id');
        }

        $habitat->setName('Habitat name updated');

        $this->manager->flush();

        return $this->redirectToRoute('app_api_habitat_show', ['id' => $habitat->getId()]);
    }




    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id): Response
    {
        $habitat = $this->repository->findOneBy(['id' => $id]);

        if(!$habitat){

            throw new BadRequestException('Habitat non trouvé pour {id} id');
        }

        $this->manager->remove($habitat);
        $this->manager->flush();
        return $this->json(['message' => 'Habitat supprimé'], Response::HTTP_NO_CONTENT);
    }
}
