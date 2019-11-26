<?php
require 'vendor/autoload.php';

$client = array();

$app = new \Slim\App;

$app->get('/produits', 'getProduits');

$app->get('/client/{id}', 'getClient');
$app->post('/client', 'addClient');
$app->put('/client/{id}', 'updateClient');
$app->delete('/client/{id}', 'deleteClient');

function setHeader($response) {
    return $response->withHeader("Access-Control-Allow-Origin", "*")->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
}

function getProduits($resquest,$response,$args)  
{
    $url = 'data.json'; // path to your JSON file
    $data = file_get_contents($url);
    return setHeader($response)->write($data);              
}

function addClient($request,$response,$args) {
    
    $body = $request->getParsedBody(); // Parse le body
    
    $client->nom = $body['nom']; // Data du formulaire
    $client->prenom = $body['prenom'];
    $client->civilite = $body['civilite'];
    $client->telephone = $body['telephone'];
    $client->ville = $body['ville'];
    $client->adresse = $body['adresse'];
    $client->cp = $body['cp'];
    $client->pays = $body['pays'];
    $client->email = $body['email'];
    $client->login = $body['login'];
    $client->password = $body['password'];
}

function getClient($request,$response,$args) {
    return $response->write(json_encode($client));
}

$app->run();
    
?>