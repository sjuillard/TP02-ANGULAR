import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from '../../shared/states/panier-state';
import { CompteClientModule } from './modules/compte-client/compte-client.module';
import { Routes, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';

const routes: Routes = [
  {
    path:'',
    component: AccueilComponent
  },
  {
    path: 'espaceclient',
    loadChildren: () => import('./modules/compte-client/compte-client.module').then(m => m.CompteClientModule)
  },
  {
    path: 'catalogue',
    loadChildren: () => import('./modules/catalogue/catalogue.module').then(m => m.CatalogueModule)
  },
  /*{path: 'formClient', component: FormClientComponent},*/
  /*{path: 'visualisation', component: VisualisationComponent},*/
  /*{path: 'listeProduits', component: ListeProduitsComponent},*/
  {
    path: 'panier', 
    loadChildren: () => import('./modules/panier/panier.module').then(m => m.PanierModule)
  },
  /*{path: 'detail/:nom/:prix/:taille/:categorie', component: DetailProduitComponent}*/
];

@NgModule({
  declarations: [
    AppComponent,
    TetiereComponent,
    FooterComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot(
      [PanierState]
    ),
    RouterModule.forRoot(routes)
  ],
  exports: [ 
    RouterModule 
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
