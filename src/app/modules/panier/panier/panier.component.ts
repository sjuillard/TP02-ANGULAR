import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Produit } from '../../../../../shared/models/produit';
import { Observable } from 'rxjs';
import { DelProduit } from 'shared/actions/delProduit-action';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.less']
})
export class PanierComponent implements OnInit {
  nbArticles : number;
  articles : Observable<Produit>;
  isEmpty : Boolean = true;
  
  constructor(private store: Store) {
    this.store.select(state => state.panier.panier).subscribe (u => this.nbArticles = u.length);
    this.store.select(state => state.panier.panier).subscribe (u => this.isEmpty = u.length < 1);
    this.articles = this.store.select(state => state.panier.panier);
   }

  ngOnInit() {
  }

  onDelClick(article) {
    this.delProduit(article);
  }

  delProduit(article) { 
    this.store.dispatch(new DelProduit(article)); 
  }

}
