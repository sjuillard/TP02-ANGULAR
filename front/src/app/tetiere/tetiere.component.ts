import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tetiere',
  templateUrl: './tetiere.component.html',
  styleUrls: ['./tetiere.component.less']
})
export class TetiereComponent implements OnInit {

  nbArticles : number;
  isConnected : boolean;
  nom: string;
  mySubscription: any;

  constructor(private store : Store, private route : ActivatedRoute, private router : Router) { 
    this.checkClientConnected();
    this.store.select(state => state.panier.panier).subscribe (u => this.nbArticles = u.length);

  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.checkClientConnected();
  }

  checkClientConnected() {
    this.isConnected = true;
    console.log(sessionStorage.getItem("idClient"));
    if(sessionStorage.getItem("idClient")==null || sessionStorage.getItem("idClient")==undefined) {
      this.isConnected = false;
    }
  }

  ngOnChanges() {
    // create header using child_id
    console.log("nbArticle:"+this.nbArticles);
  }

  deconnexion() {
    sessionStorage.clear();
    console.log("Deconnexion ok");
    this.checkClientConnected();
    this.router.navigate(['login'], { relativeTo: this.route});
  }
}
