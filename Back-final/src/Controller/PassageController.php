<?php

namespace App\Controller;

use App\Entity\Passage;
use App\Repository\PassageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('api/passage', name: 'app_api_passage_')]
class PassageController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $manager,
        private PassageRepository $repository,
        private SerializerInterface $serializer,
        private UrlGeneratorInterface $urlGenerator,
        )
    {
    }


    #[Route(name: 'new', methods: 'POST')]
    public function new(Request $request): JsonResponse
    {
        $passage = $this->serializer->deserialize($request->getContent(), Passage::class, 'json');
        $passage->setCreatedAt(new \DateTimeImmutable());

        $this->manager->persist($passage);
        $this->manager->flush();

        $responseData = $this->serializer->serialize($passage, 'json');
        $location = $this->urlGenerator->generate(
        'app_api_passage_show',
        ['id' => $passage->getId()],
        UrlGeneratorInterface::ABSOLUTE_URL
        );

        return new JsonResponse($responseData, Response::HTTP_CREATED, ["Location"=> $location], true);
    }


    #[Route('/{id}', name: 'show', methods: 'GET')]
    public function show(int $id): JsonResponse
    {
        $passage = $this->repository->findOneBy(['id' => $id]);
        if($passage){
            $responseData = $this->serializer->serialize($passage, 'json');

        return new JsonResponse($responseData, Response::HTTP_OK, [], true);
        }

        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
}

    #[Route('/{id}', name: 'edit', methods: 'PUT')]
    public function edit(int $id, Request $request): Response
    {
        $passage = $this->repository->findOneBy(['id' => $id]);
        if($passage){
            $passage = $this->serializer->deserialize(
                $request->getContent(),
                Passage::class,
                'json',
                [AbstractNormalizer::OBJECT_TO_POPULATE => $passage]
            );
            $passage->setUpdatedAt(new \DateTimeImmutable());

            $this->manager->flush();

            return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        }
            return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }




    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id): JsonResponse
    {
        $passage = $this->repository->findOneBy(['id' => $id]);
        if($passage){
        $this->manager->remove($passage);
        $this->manager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }
}