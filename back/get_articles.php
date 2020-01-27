<?php
// list_articles.php
require_once "bootstrap.php";

$articleRepository = $entityManager->getRepository('Article');
$articles = $articleRepository->findAll();