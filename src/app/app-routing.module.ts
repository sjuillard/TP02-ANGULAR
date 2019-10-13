import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormClientComponent } from './form-client/form-client.component';
import { VisualisationComponent } from './visualisation/visualisation.component';


const routes: Routes = [
  {path: "", component: FormClientComponent},
  {path: "visualisation", component: VisualisationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
