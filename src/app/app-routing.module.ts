import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormClientComponent } from './form-client/form-client.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { PanierComponent } from './panier/panier.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';


const routes: Routes = [
  {path: 'formClient', component: FormClientComponent},
  {path: 'visualisation', component: VisualisationComponent},
  {path: 'listeProduits', component: ListeProduitsComponent},
  {path: 'panier', component: PanierComponent},
  {path: 'detail/:nom/:prix/:taille/:categorie', component: DetailProduitComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
