import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../client.model';
import { Data } from '../form-client/dataProvider';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.less']
})
export class VisualisationComponent implements OnInit {

  client : Client;

  constructor(private data: Data) {
    this.client = this.data.storage;
   }

  ngOnInit() {
    
  }

}
