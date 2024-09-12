<?php

namespace App\Controller;

use App\Entity\Horaire;
use App\Repository\HoraireRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/horaire', name: 'app_api_horaire_')]
class HoraireController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private HoraireRepository $repository)
    {
    }


    #[Route(name: 'new', methods: 'POST')]
    public function new(): Response
    {
        $horaire = new Horaire();
        $horaire->setJour('Lundi');
        $horaire->setOuverture(new DateTime());
        $horaire->setFermeture(new DateTime());

        $this->manager->persist($horaire);
        $this->manager->flush();

        // a stocker en base de données
        return $this->json(
            ['message' => 'Horaire créé'],
            Response::HTTP_CREATED
        );
    }

    #[Route('/{id}', name: 'show', methods: 'GET')]
    public function show(int $id): Response
    {
        $horaire = $this->repository->findOneBy(['id' => $id]);

            if(!$horaire){
                throw new BadRequestException('Horaire non trouvé pour {id} id');
            }
            return $this->json(
                ['message'=> "Habitat trouvé : {$horaire->getJour()} pour {$horaire->getId()} id"]
            );
    }


    #[Route('/{id}', name: 'edit', methods: 'PUT')]
    public function edit(int $id): Response
    {
        $horaire = $this->repository->findOneBy(['id' => $id]);


        if(!$horaire){
            throw new BadRequestException('Horaire non trouvé pour {id} id');
        }

        $horaire->setJour('Horaire jour updated');

        $this->manager->flush();

        return $this->redirectToRoute('app_api_horaire_show', ['id' => $horaire->getId()]);
    }




    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id): Response
    {
        $horaire = $this->repository->findOneBy(['id' => $id]);

        if(!$horaire){

            throw new BadRequestException('Horaire non trouvé pour {id} id');
        }

        $this->manager->remove($horaire);
        $this->manager->flush();
        return $this->json(['message' => 'Horaire supprimé'], Response::HTTP_NO_CONTENT);
    }
}
