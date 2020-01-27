<?php
// update_article.php <id> <new-categorie> <new-nom> <new-prix> <new-taille> <new-src>
require_once "bootstrap.php";

$id = $argv[1];
$newCategorie = $argv[2];
$newNom = $argv[3];
$newPrix = $argv[4];
$newTaille = $argv[5];
$newSrc = $argv[6];

$article = $entityManager->find('Article', $id);

if ($article === null) {
    echo "L'article $id n'existe pas\n";
    exit(1);
}

$article->setCategorie($newCategorie);
$article->setNom($newNom);
$article->setPrix($newPrix);
$article->setTaille($newTaille);
$article->setSrc($newSrc);

$entityManager->flush();