<?php

namespace App\Controller;

use App\Entity\Service;
use App\Repository\ServiceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/service', name: 'app_api_service_')]
class ServiceController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private ServiceRepository $repository)
    {
    }


    #[Route(name: 'new', methods: 'POST')]
    public function new(): Response
    {
        $service = new Service();
        $service->setName('Zoo Folie');
        $service->setDescription('Service de restauration rapide');
        $service->setCreatedAt(new \DateTimeImmutable());

        $this->manager->persist($service);
        $this->manager->flush();

        // a stocker en base de données
        return $this->json(
            ['message' => 'Service créé'],
            Response::HTTP_CREATED
        );
    }

    #[Route('/{id}', name: 'show', methods: 'GET')]
    public function show(int $id): Response
    {
        $service = $this->repository->findOneBy(['id' => $id]);

            if(!$service){
                throw new BadRequestException('Service non trouvé pour {id} id');
            }
            return $this->json(
                ['message'=> "Service trouvé : {$service->getName()} pour {$service->getId()} id"]
            );
    }


    #[Route('/{id}', name: 'edit', methods: 'PUT')]
    public function edit(int $id): Response
    {
        $service = $this->repository->findOneBy(['id' => $id]);


        if(!$service){
            throw new BadRequestException('Service non trouvé pour {id} id');
        }

        $service->setName('Service name updated');

        $this->manager->flush();

        return $this->redirectToRoute('app_api_service_show', ['id' => $service->getId()]);
    }




    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id): Response
    {
        $service = $this->repository->findOneBy(['id' => $id]);

        if(!$service){

            throw new BadRequestException('Service non trouvé pour {id} id');
        }

        $this->manager->remove($service);
        $this->manager->flush();
        return $this->json(['message' => 'Service supprimé'], Response::HTTP_NO_CONTENT);
    }
}
