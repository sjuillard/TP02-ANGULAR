import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ListeProduitsService } from '../catalogue/liste-produits/liste-produits.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  form : FormGroup;

  constructor(private service : ListeProduitsService) {
    this.form = new FormGroup({
      login: new FormControl(),
      motDePasse: new FormControl()
   });
  }

  ngOnInit() {
  }

  onSubmit() {
    let login = this.form.controls['login'].value;
    let mdp = this.form.controls['motDePasse'].value;
    console.log(this.service.getToken(login, mdp));
  }

  
}
