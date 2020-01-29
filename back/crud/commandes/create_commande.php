<?php
// create_client.php <nom>
require_once "bootstrap.php";

$idClient = $argv[1];
$idArticle1 = $argv[2];
$idArticle2 = $argv[3];

$client = $entityManager->find("Client", $idClient);
$article1 = $entityManager->find("Article", $idArticle1);
$article2 = $entityManager->find("Article", $idArticle2);

$commande = new Commande();
$commande->setClient($client);
$commande->addArticle($produit1);
$commande->addArticle($produit2);
var_dump($commande);
$entityManager->persist($commande);
$entityManager->flush();

echo "Création de la commande avec l'id n°" . $commande->getId() . "\n";
