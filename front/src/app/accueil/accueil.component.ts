import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.less']
})
export class AccueilComponent implements OnInit {

  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
  }

}
