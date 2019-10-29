import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { FooterComponent } from './footer/footer.component';
import { FormClientComponent } from './form-client/form-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { Data } from './form-client/dataProvider';
import { PhoneNumberPipe } from './phone-number.pipe';
import { FiltreProduitsComponent } from './filtre-produits/filtre-produits.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from '../../shared/states/panier-state';
import { PanierComponent } from './panier/panier.component';
import { DetailProduitComponent } from './detail-produit/detail-produit.component';

@NgModule({
  declarations: [
    AppComponent,
    TetiereComponent,
    FooterComponent,
    FormClientComponent,
    VisualisationComponent,
    PhoneNumberPipe,
    FiltreProduitsComponent,
    ListeProduitsComponent,
    PanierComponent,
    DetailProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot(
      [PanierState]
    )
  ],
  providers: [Data],
  bootstrap: [AppComponent]
})
export class AppModule { }
