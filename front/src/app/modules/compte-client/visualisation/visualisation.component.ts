import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../../../models/client.model';
import { Data } from '../form-client/dataProvider';
import { ListeProduitsService } from '../../catalogue/liste-produits/liste-produits.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.less']
})
export class VisualisationComponent implements OnInit {

  client : Client;

  constructor(public listeProduitsService : ListeProduitsService) {
    this.listeProduitsService.getClient().subscribe(value => this.client = value);
   }

  ngOnInit() {
    console.log(sessionStorage.getItem("idClient"));
    this.listeProduitsService.getClient().subscribe(value => this.client = value);
  }

}
