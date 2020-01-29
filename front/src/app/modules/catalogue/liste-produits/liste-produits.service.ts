import { Injectable, Output, EventEmitter } from '@angular/core';
import {Produit} from '../../../../models/produit.model';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
  getEmitter() {
    return this.fireIsLoggedIn;
  }

  constructor(private httpClient : HttpClient, private route :  ActivatedRoute, private router : Router) { }

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

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
      let data = dataReturned[0];
      if(data["idClient"]!=null && data["token"]!=null) {
        sessionStorage.setItem("token", data['token']);
        sessionStorage.setItem("idClient", data['idClient']);
        this.fireIsLoggedIn.emit("connected");
        this.router.navigate([''], { relativeTo: this.route}); 
      }
    });
  }
  
  getProduits() : Observable<Produit[]>
  {
    return this.httpClient.get<Produit[]>(environment.produits);
  }

  getClient() : Observable<Client>
  {
    const params = new HttpParams().set('id', sessionStorage.getItem("idClient"));
    return this.httpClient.get<Client>(environment.getClient, {params});
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
    newC.subscribe(a => { sessionStorage.setItem("idClient", ""+a.id);
    this.fireIsLoggedIn.emit("connected");});
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
    this.httpClient.post<Object>(environment.postCommande, data, httpOptions);
  }

  checkClientConnected() : boolean {
    if(sessionStorage.getItem("idClient")==null || sessionStorage.getItem("idClient")==undefined) {
      return false;
    }
    return true;
  }
}
