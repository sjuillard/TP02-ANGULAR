import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FiltreProduitsComponent } from '../catalogue/filtre-produits/filtre-produits.component';
import { PanierComponent } from './panier/panier.component';

const routes: Routes = [
  {
    path: '',
    component: PanierComponent
  }
];

@NgModule({
  declarations: [
    PanierComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [
    
  ]
})
export class PanierModule { }
