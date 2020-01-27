<?php
// list_articles.php
require_once "bootstrap.php";

$articleRepository = $entityManager->getRepository('Article');
$articles = $articleRepository->findAll();

foreach ($articles as $article) {
    echo sprintf("- %s %s %s %s\n", 
        $article->getId(), 
        $article->getCategorie(), 
        $article->getNom(),
        $article->getPrix());
}