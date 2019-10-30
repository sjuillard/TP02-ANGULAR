import { Injectable } from '@angular/core';
import  { Produit } from '../models/produit.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class DataServiceService {

  constructor(private http:HttpClient) { }

  public getProduits() : Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.produits);
  }
}
