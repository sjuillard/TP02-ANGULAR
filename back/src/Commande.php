<?php

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 * @ORM\Table(name="commandes")
 */
class Commande {
     /** 
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    protected $id;

     
    /**
     * @ORM\ManyToMany(targetEntity="Article")
     * @ORM\JoinTable(name="commandes_articles",
     *      joinColumns={@ORM\JoinColumn(name="commande_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="article_id", referencedColumnName="id", unique=false)}
     *      )
     */
    protected $articles;

    /**
     * @ORM\ManyToOne(targetEntity="Client", inversedBy="commandes")
     */
    protected $client;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
        $this->client = null;
    }

    public function getId() {
        return $this->id;
    }
    
    public function addArticle(Article $article) {
        $this->articles[] = $article;
    }

    public function setClient(Client $client) {
        $this->client = $client;
    }

    public function getArticles() {
        return $this->articles;
    }

    public function getClient() {
        return $this->client;
    }
}