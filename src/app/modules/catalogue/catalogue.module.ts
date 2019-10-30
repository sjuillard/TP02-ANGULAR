import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FiltreProduitsComponent } from './filtre-produits/filtre-produits.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';
import { Data } from '../compte-client/form-client/dataProvider';

const routes: Routes = [
    {
        path: '',
        component: ListeProduitsComponent
    },
    { 
        path: 'detail/:id', 
        loadChildren: () => import('./detail-produit/detail-produit.module').then(m => m.DetailProduitModule)
    }
];

@NgModule({
  declarations: [
    ListeProduitsComponent,
    FiltreProduitsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ 
    RouterModule 
  ],
  providers: [
    Data
  ],
})
export class CatalogueModule { }
