<?php
// create_product.php <name>
require_once "bootstrap.php";

$newProductCategorie = $argv[1];
$newProductNom = $argv[2];
$newProductPrix = $argv[3];
$newProductTaille = $argv[4];
$newProductSrc = $argv[5];

$product = new Article();
$product->setCategorie($newProductCategorie);
$product->setNom($newProductNom);
$product->setPrix($newProductPrix);
$product->setTaille($newProductTaille);
$product->setSrc($newProductSrc);

$entityManager->persist($product);
$entityManager->flush();

echo "Created Product with ID " . $product->getId() . "\n";
