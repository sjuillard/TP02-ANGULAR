import { Injectable } from '@angular/core';
import {Produit} from '../../../../models/produit.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { environment } from '../../../../environments/environment';
import { Client } from 'src/models/client.model';

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

  constructor(private httpClient : HttpClient) { }

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
      console.log(dataReturned['token']);
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
    return this.httpClient.post<Client>(environment.addClient, client, httpOptions).pipe(catchError(this.handleError));
  }
}
