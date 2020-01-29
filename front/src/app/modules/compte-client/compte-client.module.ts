import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormClientComponent } from './form-client/form-client.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberPipe } from 'src/app/phone-number.pipe';
import { RouterModule, Routes } from '@angular/router';
import { Data } from './form-client/dataProvider';
import { FiltreProduitsComponent } from '../catalogue/filtre-produits/filtre-produits.component';

const routes: Routes = [
    { path: '', component: FormClientComponent}, 
    { path: 'visualisation', component: VisualisationComponent }
];

@NgModule({
  declarations: [
    FormClientComponent, 
    VisualisationComponent,
    PhoneNumberPipe
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
    Data
  ]
})
export class CompteClientModule { }
