<?php

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="clients")
 */
class Client {
     /** 
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    protected $id;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $nom;
    
    /** 
     * @ORM\Column(type="string") 
     */
    protected $prenom;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $civilite;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $telephone;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $adresse;
    
    /** 
     * @ORM\Column(type="string") 
     */
    protected $ville;
    
    /** 
     * @ORM\Column(type="string") 
     */
    protected $cp;
    
    /**
     * @ORM\Column(type="string")
     */
    protected $pays;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $email;
    /** 
     * @ORM\Column(type="string") 
     */
    protected $login;
    
    /** 
    * @ORM\Column(type="string") 
    */
   protected $password;

   /**
     * @ORM\OneToMany(targetEntity="Commande", mappedBy="client")
     */
   protected $commandes;

    public function __construct() {
        $this->commandes = new ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNom() {
        return $this->nom;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }

    public function getPrenom() {
        return $this->prenom;
    }

    public function setPrenom($prenom) {
        $this->prenom = $prenom;
    }

    public function getCivilite() {
        return $this->civilite;
    }

    public function setCivilite($civilite) {
        $this->civilite = $civilite;
    }

    public function getTelephone()
    {
        return $this->telephone;
    }

    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;
    }

    public function getAdresse() {
        return $this->adresse;
    }

    public function setAdresse($adresse) {
        $this->adresse = $adresse;
    }

    public function getCp()
    {
        return $this->cp;
    }

    public function setCp($cp)
    {
        $this->cp = $cp;
    }

    public function getVille()
    {
        return $this->ville;
    }

    public function setVille($ville)
    {
        $this->ville = $ville;
    }

    public function getPays() {
        return $this->pays;
    }

    public function setPays($pays) {
        $this->pays = $pays;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }
    
    public function getLogin()
    {
        return $this->login;
    }

    public function setLogin($login)
    {
        $this->login = $login;
    }
    
    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }
}