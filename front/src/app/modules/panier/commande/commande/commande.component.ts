import { Component, OnInit } from '@angular/core';
import { Produit } from 'shared/models/produit';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { DelProduit } from 'shared/actions/delProduit-action';
import { DelAllProduit } from 'shared/actions/delAllProduit-action';
import { map } from 'rxjs/operators';
import { ListeProduitsService } from 'src/app/modules/catalogue/liste-produits/liste-produits.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.less']
})
export class CommandeComponent implements OnInit {
  nbArticles : number;
  articles : Observable<Produit[]>;
  lesArticles : Produit[];
  total : Observable<Number>;

  constructor(private store: Store, private service : ListeProduitsService, private route : ActivatedRoute, private router : Router) {;
    //on stock les articles
    this.articles = this.store.select(state => state.panier.panier);
    //on calcule le prix total du panier
    this.total = this.articles.pipe(map(order => order.reduce((total, price) => total + (+price.prix), 0)));
    //on regarde combien d'article on a
    this.store.select(state => state.panier.panier).subscribe (u => { this.nbArticles = u.length; this.lesArticles = u;});
  }

  ngOnInit() {
  }

  validerCommande() {
    //on poste la commande (NE FONCTIONNE PAS)
    this.service.postCommande(sessionStorage.getItem("idClient"), this.lesArticles); 
    //on supprime les articles du panier
    this.store.dispatch(new DelAllProduit());
    //on retourne sur le panier
    this.router.navigate(['panier']);
  }
}
