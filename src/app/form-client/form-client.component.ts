import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.less']
})
export class FormClientComponent implements OnInit {
  prenom: string ="toto";
  constructor() { }

  ngOnInit() {
  }

}
