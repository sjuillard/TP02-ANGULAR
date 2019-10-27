import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormClientComponent } from './form-client/form-client.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';


const routes: Routes = [
  {path: "", component: FormClientComponent},
  {path: "visualisation", component: VisualisationComponent},
  {path: "listeProduits", component: ListeProduitsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
