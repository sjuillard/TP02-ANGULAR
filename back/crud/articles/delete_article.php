<?php
// delete_article.php <id_article>
require_once "bootstrap.php";

$id = $argv[1];
$article = $entityManager->find('Article', $id);

if ($article === null) {
    echo "L'article n'a pas été trouvé! \n";
    exit(1);
}

$entityManager->remove($article);
echo "L'article $id a bien ete supprime!";
$entityManager->flush();