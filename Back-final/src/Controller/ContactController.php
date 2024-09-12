<?php

namespace App\Controller;

use App\Entity\Contact;
use App\Repository\ContactRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('api/contact', name: 'app_api_contact_')]
class ContactController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private ContactRepository $repository)
    {
    }


    #[Route(name: 'new', methods: 'POST')]
    public function new(): Response
    {
        $contact = new Contact();
        $contact->setName('John');
        $contact->setEmail('johndoe@mail.com');
        $contact->setDemande('Deamnde de renseignements');


        $this->manager->persist($contact);
        $this->manager->flush();

        // a stocker en base de données
        return $this->json(
            ['message' => 'Demande de contact créé'],
            Response::HTTP_CREATED
        );
    }

    #[Route('/{id}', name: 'show', methods: 'GET')]
    public function show(int $id): Response
    {
        $contact = $this->repository->findOneBy(['id' => $id]);

            if(!$contact){
                throw new BadRequestException('Demande de contact non trouvé pour {id} id');
            }
            return $this->json(
                ['message'=> "Demande de contact trouvé : {$contact->getName()} pour {$contact->getId()} id"]
            );
    }


    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id): Response
    {
        $contact = $this->repository->findOneBy(['id' => $id]);

        if(!$contact){

            throw new BadRequestException('Demande de contact non trouvé pour {id} id');
        }

        $this->manager->remove($contact);
        $this->manager->flush();
        return $this->json(['message' => 'Demande de contact supprimé'], Response::HTTP_NO_CONTENT);
    }
}
