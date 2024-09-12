<?php

namespace App\Controller;

use App\Entity\Passage;
use App\Repository\PassageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/passage', name: 'app_api_passage_')]
class PassageController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private PassageRepository $repository)
    {
    }


    #[Route(name: 'new', methods: 'POST')]
    public function new(): Response
    {
        $passage = new Passage();
        $passage->setNom('boby');
        $passage->setRace('lion');
        $passage->setHabitat('savane');
        $passage->setNourriture('boeuf');
        $passage->setQuantitee('500grs');
        $passage->setDate(new \DateTimeImmutable());
        $passage->setHeure(new \DateTimeImmutable());


        $this->manager->persist($passage);
        $this->manager->flush();

        // a stocker en base de données
        return $this->json(
            ['message' => 'Passage créé'],
            Response::HTTP_CREATED
        );
    }

    #[Route('/{id}', name: 'show', methods: 'GET')]
    public function show(int $id): Response
    {
        $passage = $this->repository->findOneBy(['id' => $id]);

            if(!$passage){
                throw new BadRequestException('Passage non trouvé pour {id} id');
            }
            return $this->json(
                ['message'=> "Passage trouvé : {$passage->getNom()} pour {$passage->getId()} id"]
            );
    }


    #[Route('/{id}', name: 'edit', methods: 'PUT')]
    public function edit(int $id): Response
    {
        $passage = $this->repository->findOneBy(['id' => $id]);


        if(!$passage){
            throw new BadRequestException('Passage non trouvé pour {id} id');
        }

        $passage->setNom('Passage name updated');

        $this->manager->flush();

        return $this->redirectToRoute('app_api_passage_show', ['id' => $passage->getId()]);
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
