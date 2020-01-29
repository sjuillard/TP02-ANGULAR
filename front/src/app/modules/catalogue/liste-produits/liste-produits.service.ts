import { Injectable } from '@angular/core';
import {Produit} from '../../../../models/produit.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from '../../../../environments/environment';
import { Client } from 'src/models/client.model';
import { Data, ActivatedRoute, Router } from '@angular/router';

const httpOptions = {
  headers : new HttpHeaders( {
    'Content-Type': 'application/json',
    'Authorization' : 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ListeProduitsService {

  constructor(private httpClient : HttpClient, private route :  ActivatedRoute, private router : Router) { }

  getToken(login : string, mdp : string) {
    let data = JSON.stringify({
      login: login,
      motDePasse: mdp
    });
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.httpClient.post<Object>(environment.login,data, httpOptions)
    .subscribe(dataReturned => {
      console.log(dataReturned);
      let data = dataReturned[0];
      console.log(data);
      sessionStorage.setItem("token", data['token']);
      sessionStorage.setItem("idClient", data['idClient']);
      this.router.navigate([''], { relativeTo: this.route});
    });
  }

  
  
  getProduits() : Observable<Produit[]>
  {
    return this.httpClient.get<Produit[]>(environment.produits);
  }

  getClient() : Observable<Client>
  {
    return this.httpClient.get<Client>(environment.getClient).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  addClient(client : Client) : Observable<Client> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    let newC = this.httpClient
    .post<Client>(environment.addClient, client, httpOptions);
    newC.subscribe(a => sessionStorage.setItem("idClient", ""+a.id));
    return newC;
  }

  postCommande(idClient: string, produits: Produit[]) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let idArticles = Array();
    let a=0;
    produits.forEach(element => {
      idArticles[a] = element.id;
      a++;
    });
    let data = {idClient: idClient, idArticles: idArticles};
    console.log(data);
    this.httpClient.post<Object>(environment.postCommande, data, httpOptions)
      .subscribe(u => console.log(u));
  }
}
