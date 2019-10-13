import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../client.model';

@Component({
  selector: 'app-visualisation',
  templateUrl: './visualisation.component.html',
  styleUrls: ['./visualisation.component.less']
})
export class VisualisationComponent implements OnInit {

  @Input() client : Client;

  constructor() {
    
   }

  ngOnInit() {
    
  }

}
