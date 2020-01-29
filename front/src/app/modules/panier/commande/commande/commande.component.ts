import { Component, OnInit } from '@angular/core';
import { Produit } from 'shared/models/produit';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { DelProduit } from 'shared/actions/delProduit-action';
import { DelAllProduit } from 'shared/actions/delAllProduit-action';
import { map } from 'rxjs/operators';
import { ListeProduitsService } from 'src/app/modules/catalogue/liste-produits/liste-produits.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.less']
})
export class CommandeComponent implements OnInit {
  nbArticles : number;
  articles : Observable<Produit[]>;
  lesArticles : Produit[];
  total : number = 0;

  constructor(private store: Store, private service : ListeProduitsService) {
    this.store.select(state => state.panier.panier).forEach(a => this.total += a.prix);
    this.articles = this.store.select(state => state.panier.panier);
    this.store.select(state => state.panier.panier).subscribe (u => { this.nbArticles = u.length; this.lesArticles = u;});
  }

  ngOnInit() {
    this.total = 0;
  }

  validerCommande() {
    let idClient = sessionStorage.getItem("idClient");
    console.log(idClient);
    //this.service.postCommande(idClient, this.lesArticles); 
    
    //this.store.dispatch(new DelAllProduit());
  }
}
