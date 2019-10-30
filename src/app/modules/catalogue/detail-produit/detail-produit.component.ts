import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddProduit } from 'shared/actions/produit-action';
import { Produit } from 'src/models/produit.model';
import { ListeProduitsService } from '../liste-produits/liste-produits.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.less']
})
export class DetailProduitComponent implements OnInit {

  private selectedArticle : Produit;
  id : string;
  nom : string;
  categorie : string;
  prix : number;
  taille : string;

  constructor(private route : ActivatedRoute, private store : Store, public listeProduitsService : ListeProduitsService) {
    let id = this.route.snapshot.paramMap.get('id');
    this.listeProduitsService.getProduits().subscribe((items) => 
    {
      this.selectedArticle = items.find(art => art.id==id)
    });
  }

  ngOnInit() {
    

    /*this.id = this.article.id;
    this.nom = this.article.nom;
    this.categorie = this.article.categorie;
    this.prix = this.article.prix;
    this.taille = this.article.taille;*/
  }
  
  onAddClick(id, nom, categorie, prix, taille)  {
    this.addProduit(id, nom, prix, categorie, taille);
  }
  
  addProduit(id, nom, prix, categorie, taille) { 
    this.store.dispatch(new AddProduit({id, nom, prix, categorie, taille})); 
  }
}
