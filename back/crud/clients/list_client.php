<?php
// list_clients.php
require_once "bootstrap.php";

$clientRepository = $entityManager->getRepository('Client');
$clients = $clientRepository->findAll();

foreach ($clients as $client) {
    echo sprintf("- %s %s %s %s password: %s\n", 
        $client->getId(), 
        $client->getNom(), 
        $client->getPrenom(),
        $client->getEmail(),
        $client->getPassword());
}