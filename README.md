# Creation d'une API pour le sujet du ZOO ARCADIA
Ce projet est une API REST développée en Symfony 7 en utilisant le bundle NelmioApiDoc pour pouvoir générer et personnaliser la documentation de l'API.

# Prérequis 
- PHP >= 8.1
- Composer
- Symfony CLI (facultatif, mais recommandé)
- Serveur MySQL ou autre ( PostgreSQL, SQLite...)
- Postman ou autre client API pour tester les endpoints

# Installation

  1. Cloner le dépôt dans un terminal
  git clone https://github.com/chloebaisse1/ECF-FINAL-BACK.git
  cd nom-du-projet

  2. Installer les dependances :
     
   Assurez-vous d'avoir installer Composer. Executez ensuite la commande suivante pour installer les dépendances du projet : 
   dans le terminal a la racine du projet : 
        composer install

  4. Configurer l'application :
     
  copiez le fichier .env et configurez vos informations de base de données : 
   cp .env .env.local 

  Modifier le fichier .env.local pour y ajouter vos informations de base de données :
   DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name"  

  4. Creer la base de données et executer les migrations :
     
   Générez la base de données en executant les commandes suivantes :
   
    placez vous dans votre terminal, dans votre projet puis : 
         php bin/console doctrine:database:create 
         php bin/console doctrine:migrations:migrate 

  6. Lancer le serveur de dévelopement :

    Pour démarrer le seerveur de développement Symfony, utilisez la commande suivante :
     symfony server:start 

    L'API sera accessible à l'adresse suivante : http://localhost:8000

 # Documentation de l'API avec NelmioApiDocBundle
 
 Ce projet utilise NelmioApiDocBundle pour générer et personnaliser la documentation de l'API.
 Voici comment l'installer et l'utiliser.

1. Installation de NelmioApiDocBundle :

  Installer le Bundle via Composer : 
  composer require nelmio/api-doc-bundle

2. Configuration :
Ajoutez la configuration de base de Nelmio dans config/packages/nelmio_api_doc.yaml :

nelmio_api_doc:
    documentation:
        info:
            title: "API Documentation"
            description: "Documentation pour l'API Symfony 7"
            version: "1.0.0"
    areas:
        path_patterns:
            - ^/api

3. Accès à la documentation :
   
   Une fois configuré, vous pouvez accéder à la documentation de l'API générer automatiquement à l'adresse suivante :
   http://localhost:8000/api/doc

   Vous pouvez également la tester via des outils comme Postman ou cURL.

# Tests

Pour exécuter les tests, utilisez la commande suivante :
php bin/phpunit



     

    
