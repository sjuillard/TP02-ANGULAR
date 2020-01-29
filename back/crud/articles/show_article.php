<?php
// show_article.php <id>
require_once "bootstrap.php";

$id = $argv[1];
$article = $entityManager->find('Article', $id);

if ($article === null) {
    echo "L'article n'a pas été trouvé! \n";
    exit(1);
}

echo sprintf("-%s %s %s %s\n", 
$article->getId(), 
$article->getCategorie(), 
$article->getNom(),
$article->getPrix());