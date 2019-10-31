import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';

const routes: Routes = [
  {
    path: '',
    component: DetailProduitComponent
  }
];

@NgModule({
  declarations: [
    DetailProduitComponent
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
  ]
})
export class DetailProduitModule { }
