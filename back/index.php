<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

require_once 'vendor/autoload.php';
require_once "bootstrap.php";

const CLE = "cledeswann";
$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);

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
$app->get('/getclientbyid', 'getClientById');
$app->post('/client', 'addClient');
$app->put('/client/{id}', 'updateClient');
$app->delete('/client/{id}', 'deleteClient');
$app->get('/connexion', '');
$app->post("/postcommande", 'postCommande');

function login ($request, $response, $args) {
    global $entityManager;
    
    $body = $request->getParsedBody(); // Parse le body
    $clientRepository = $entityManager->getRepository('Client');
    $clients = $clientRepository->findAll();
    $enteredLogin = $body['login'];
    $enteredPwd = $body['motDePasse'];

    foreach($clients as $client) {
        if($client->getLogin()===$enteredLogin && password_verify($enteredPwd, $client->getPassword())) {
            $issuedAt = time();

            $expirationTime = $issuedAt + 300; // jwt valid for 60 seconds from the issued time
            $payload = array(
                'login' => $enteredLogin,
                'iat' => $issuedAt,
                'exp' => $expirationTime
            );
            $token_jwt = JWT::encode($payload,CLE, "HS256");
    
            $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
            
            $data[] = array('token' => $token_jwt, 'idClient' => $client->getId());
            return $response->withJson($data);
        }
    }    
    $data = array('idClient' => 0, 'token' => 'Erreur de login');
    return $response->withJson($data);
}

function getByLogin($login) {
    global $entityManager;
    $client = $entityManager->find('Article', $id);
}

$app->post('/login', 'login');

function setHeader($response) {
    return $response->withHeader("Access-Control-Allow-Origin", "*")->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
}

function getProduits($resquest,$response,$args)  
{
    global $entityManager;
    $articleRepository = $entityManager->getRepository('Article');
    $articles = $articleRepository->findAll();
    $array = [];
    foreach($articles as $article) {
        $array[] = array('id'=>$article->getId(),
                        'categorie'=>$article->getCategorie(),
                        'nom'=>$article->getNom(),
                        'prix'=>$article->getPrix(),
                        'taille'=>$article->getTaille(),
                        'src'=>$article->getSrc());
    }
    return $response->write(json_encode($array));              
}

function addClient($request,$response,$args) {
    global $entityManager;
    $body = $request->getParsedBody(); // Parse le body
    $client = new Client();
    $client->setNom($body['nom']); 
    $client->setPrenom($body['prenom']);
    $client->setCivilite($body['civilite']);
    $client->setTelephone($body['telephone']);
    $client->setVille($body['ville']);
    $client->setAdresse($body['adresse']);
    $client->setCp($body['cp']);
    $client->setPays($body['pays']);
    $client->setEmail($body['email']);
    $client->setLogin($body['login']);
    $client->setPassword(password_hash($body['password'], PASSWORD_DEFAULT));
    $entityManager->persist($client);
    $entityManager->flush();
    $data = array(
        "id" => $client->getId(),
        "nom" => $client->getNom(),
        "prenom" => $client->getPrenom(),
        "civilite" => $client->getCivilite(),
        "telephone" => $client->getTelephone(),
        "ville" => $client->getVille(),
        "adresse" => $client->getAdresse(),
        "cp" => $client->getCp(),
        "pays" => $client->getPays(),
        "email" => $client->getEmail(),
        "login" => $client->getLogin(),
        "password" => $client->getPassword()
    );
    return $response->write(json_encode($data));
}

function getClient($request,$response,$args) {
    global $entityManager;
    $id = $_GET["id"];
    $client = $entityManager->find('Client', $id);

    if ($client === null) {
        $response->write(json_encode(
            array('erreur'=>'L\'article n\'a pas été trouvé!')
        ));
    }
    $toSend = array(
        "id"=>$client->getId(),
        "nom"=>$client->getNom(),
        "prenom"=>$client->getPrenom(),
        "civilite"=>$client->getCivilite(),
        "telephone"=>$client->getTelephone(),
        "adresse"=>$client->getAdresse(),
        "cp"=>$client->getCp(),
        "ville"=>$client->getVille(),
        "pays"=>$client->getPays(),
        "email"=>$client->getEmail(),
        "login"=>$client->getLogin(),
        "password"=>$client->getPassword());
    return $response->write(json_encode($toSend));
}

function postCommande($request,$response,$args) {
    global $entityManager;

    $body = $request->getParsedBody();
    $commande = new Commande();
    $client = $entityManager->find("Client", $body["idClient"]);
    if($client != null)
        $commande->setClient($client);
    $commandes = $body["idArticles"];
    //echo "count:".count($commandes);
    
    for($i=0;$i<count($commandes);$i++) {
        //echo "Commande $i: ".$commandes[$i];
        $article = $entityManager->find("Article", $commandes[$i]);
        if($article != null)
            $commande->addArticle($article);
    }
    try {
        $entityManager->persist($commande);
        $entityManager->flush();
    }
    catch (UniqueConstraintViolationException $e) {
        echo "erreur";
    }
    return $response->write(json_encode($body));
}

$app->run();
    
?>