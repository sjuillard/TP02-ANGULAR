<?php
// create_client.php <nom>
require_once "bootstrap.php";

$nom = $argv[1];
$prenom = $argv[2];
$civilite = $argv[3];
$telephone = $argv[4];
$adresse = $argv[5];
$ville = $argv[6];
$cp = $argv[7];
$email = $argv[8];
$login = $argv[9];
$password = $argv[10];

$client = new Client();
$client->setNom($nom);
$client->setPrenom($prenom);
$client->setCivilite($civilite);
$client->setTelephone($telephone);
$client->setAdresse($adresse);
$client->setVille($ville);
$client->setCp($cp);
$client->setEmail($email);
$client->setLogin($login);
$client->setPassword($password);

$entityManager->persist($client);
$entityManager->flush();

echo "Création du client avec l'id n°" . $client->getId() . "\n";
