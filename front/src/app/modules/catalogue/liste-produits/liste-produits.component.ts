import { Component, OnInit , EventEmitter, Input} from '@angular/core';
import { ListeProduitsService } from './liste-produits.service';
import { Produit } from '../../../../models/produit.model';
import { Store } from '@ngxs/store';
import { AddProduit } from '../../../../../shared/actions/produit-action';

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.less']
})
export class ListeProduitsComponent implements OnInit {
  
  public produits : Produit[] = [];
  private produitsFiltres : Produit[] = [];
  public isEmpty : boolean = false;

  @Input() filtre : String; 

  constructor(public listeProduitsService : ListeProduitsService, private store : Store) { }

  ngOnInit() {
    this.listeProduitsService.getProduits().subscribe(response => {
        this.produits = response;
        this.produitsFiltres = response; 
        console.log(this.produits);
      }
    ); 
  }

  rechercherParNom(leFiltre : string) {
    this.filtre = leFiltre;
    this.isEmpty = false;
    this.produitsFiltres = [];
    if (this.filtre === ""){
      this.produitsFiltres = this.produits;
      return; 
    }
    for (let i=0; i < this.produits.length; i++)
    {
        if (this.produits[i].nom.toLowerCase().includes(this.filtre.toLowerCase().trim()))
        {
          this.produitsFiltres.push(this.produits[i]);
        }
    }
    if (this.produitsFiltres.length == 0)
      this.isEmpty = true;
  }

  onAddClick(id, nom, categorie, prix, taille, src)  {
    this.addProduit(id, nom, prix, categorie, taille, src);
  }
  
  addProduit(id, nom, prix, categorie, taille, src) { 
    this.store.dispatch(new AddProduit({id, nom, prix, categorie, taille, src})); 
  }
}