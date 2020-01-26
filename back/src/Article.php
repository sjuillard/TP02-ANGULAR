<?php

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="articles")
 */
class Article {
     /** 
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    protected $id;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $categorie;
    
    /** 
     * @ORM\Column(type="string") 
     */
    protected $nom;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $prix;
    
    /** 
     * @ORM\Column(type="string") 
     */
    protected $taille;

    /** 
     * @ORM\Column(type="string") 
     */
    protected $src;

    public function getId()
    {
        return $this->id;
    }

    public function getCategorie() {
        return $this->categorie;
    }

    public function setCategorie($categorie) {
        $this->categorie = $categorie;
    }

    public function getPrix() {
        return $this->prix;
    }

    public function setPrix($prix) {
        $this->prix = $prix;
    }

    public function getTaille() {
        return $this->taille;
    }

    public function setTaille($taille) {
        $this->taille = $taille;
    }

    public function getNom()
    {
        return $this->nom;
    }

    public function setNom($nom)
    {
        $this->nom = $nom;
    }

    public function getSrc() {
        return $this->src;
    }

    public function setSrc($src) {
        $this->src = $src;
    }
}