import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtre-produits',
  templateUrl: './filtre-produits.component.html',
  styleUrls: ['./filtre-produits.component.less']
})
export class FiltreProduitsComponent implements OnInit {
  @Output() filter : EventEmitter<String> = new EventEmitter<String>();
  filterName : String = "";

  constructor() { }

  ngOnInit() {
  }

  sendFilterByName(){
    this.filter.emit(this.filterName);
  }
}
