import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ListeProduitsService } from '../modules/catalogue/liste-produits/liste-produits.service';

@Component({
  selector: 'app-tetiere',
  templateUrl: './tetiere.component.html',
  styleUrls: ['./tetiere.component.less']
})
export class TetiereComponent implements OnInit {

  nbArticles : number;
  isConnected : boolean;
  nom: string;

  constructor(private store : Store, private route : ActivatedRoute, private router : Router, private service : ListeProduitsService) { 
    this.isConnected = this.service.checkClientConnected();
    this.store.select(state => state.panier.panier).subscribe (u => this.nbArticles = u.length);

  }

  ngOnInit() {
    this.service.getEmitter().subscribe((customObject) => {
      this.isConnected = this.service.checkClientConnected();
    });
  }

  ngOnChanges() {}

  deconnexion() {
    //on clear la session
    sessionStorage.clear();
    //on reload si le client est connecte ou pas
    this.isConnected = false;
    //on va sur la page de login
    this.router.navigate(['login'], { relativeTo: this.route});
  }
}
