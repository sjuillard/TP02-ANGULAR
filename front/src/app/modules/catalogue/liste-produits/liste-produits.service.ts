import { Injectable } from '@angular/core';
import {Produit} from '../../../../models/produit.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListeProduitsService {

  constructor(private httpClient : HttpClient) { }
  
  getProduits() : Observable<Produit[]>
  {
      return this.httpClient.get<Produit[]>(environment.produits);
  }
}
