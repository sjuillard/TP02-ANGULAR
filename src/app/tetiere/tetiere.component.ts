import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-tetiere',
  templateUrl: './tetiere.component.html',
  styleUrls: ['./tetiere.component.less']
})
export class TetiereComponent implements OnInit {

  nbArticles : number;

  constructor(private store : Store) { 
    this.store.select(state => state.panier.panier).subscribe (u => this.nbArticles = u.length);
  }

  ngOnInit() {
  }

}
