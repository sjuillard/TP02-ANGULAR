import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Produit } from '../models/produit';
import { AddProduit } from 'shared/actions/produit-action';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.less']
})
export class DetailProduitComponent implements OnInit {

  nom : String;
  prix : String;
  categorie : String;
  taille : String;

  constructor(private route : ActivatedRoute, private store : Store) { }

  ngOnInit() {
    this.nom = this.route.snapshot.paramMap.get('nom');
    this.prix = this.route.snapshot.paramMap.get('prix');
    this.categorie = this.route.snapshot.paramMap.get('categorie');
    this.taille = this.route.snapshot.paramMap.get('taille');
  }
  
  onAddClick(nom, categorie, prix, taille)  {
    this.addProduit(nom, prix, categorie, taille);
  }
  
  addProduit(nom, prix, categorie, taille) { 
    this.store.dispatch(new AddProduit({nom, prix, categorie, taille})); 
  }
}
