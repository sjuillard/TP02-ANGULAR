import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../../../models/client.model';
import { Data } from '../form-client/dataProvider';
import { ListeProduitsService } from '../../catalogue/liste-produits/liste-produits.service';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.less']
})
export class VisualisationComponent implements OnInit {

  client : Client;

  constructor(private data: Data, public listeProduitsService : ListeProduitsService) {
    this.client = this.data.storage;
    listeProduitsService
   }

  ngOnInit() {
    
  }

}
