<?php
// list_commandes.php
require_once "bootstrap.php";

$repository = $entityManager->getRepository('Commande');
$commandes = $repository->findAll();

foreach ($commandes as $commande) {

    echo sprintf("Commande n°%s\n", 
        $commande->getId()); 
    if($commande->getClient()!=null) {
        echo sprintf("Client:%s %s\n",
        $commande->getClient()->getNom(),
        $commande->getClient()->getPrenom());
    }
    echo sprintf("Produits: \n");
    $articles = $commande->getArticles();
    foreach($articles as $article) {
        echo sprintf("- id: %s nom: %s\n", $article->getId(), $article->getNom());
    }
    echo sprintf("\n");
}