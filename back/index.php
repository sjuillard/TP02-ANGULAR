<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require 'vendor/autoload.php';
require_once "bootstrap.php";

const CLE = "cledeswann";

$app = new \Slim\App;

$jwt = new \Slim\Middleware\JwtAuthentication([
    "path" => "/api",
    "secure" => false,
    "passthrough" => ["/api/users/login","/api/users/register"],
    "secret" => CLE,
    "attribute" => "decoded_token_data",
    "algorithm" => ["HS256"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'ERREUR', 'ERREUR' => 'AUTO');
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
]);

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});
$app->add($jwt);

$app->get('/produits', 'getProduits');

$app->get('/getclient', 'getClient');
$app->post('/client', 'addClient');
$app->put('/client/{id}', 'updateClient');
$app->delete('/client/{id}', 'deleteClient');
$app->get('/connexion', '');

function login ($request, $response, $args) {
    $login = "swann";
    $pwd = "swann";
    
    $body = $request->getParsedBody(); // Parse le body
    $enteredLogin = $body['login'];
    $enteredPwd = $body['motDePasse']; 

    if($enteredLogin==$login && $enteredPwd==$pwd) {
        $issuedAt = time();
        $expirationTime = $issuedAt + 60; // jwt valid for 60 seconds from the issued time
        $payload = array(
        'login' => $enteredLogin,
        'iat' => $issuedAt,
        'exp' => $expirationTime
        );
        $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
        
        $response = $response->withHeader("Authorization", "Bearer {$token_jwt}")->withHeader("Content-
        Type", "application/json");
        
        $data = array('login' => $login, 'pwd' => $pwd, 'token' => $token_jwt);
        return $response->withJson($data);
    }
    $data = array("erreur" => 'Erreur!', 'token' => "Erreur de login");
    return $response->withJson($data);
}
$app->post('/login', 'login');

function setHeader($response) {
    return $response->withHeader("Access-Control-Allow-Origin", "*")->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
}

function getProduits($resquest,$response,$args)  
{
    $url = 'data.json'; // path to your JSON file
    $data = file_get_contents($url);
    return $response->write($data);              
}

function addClient($request,$response,$args) {
    $body = $request->getParsedBody(); // Parse le body
    $client = array();
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
    
    return $response->write(json_encode($client));
}

function getClient($request,$response,$args) {
    return $response->write(json_encode($client));
}

$app->run();
    
?>