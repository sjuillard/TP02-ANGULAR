import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from "@angular/router";
import {Client} from "../../../../models/client.model";
import { Data } from './dataProvider'

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.less']
})
export class FormClientComponent implements OnInit {
  
  estEnvoye: boolean = false;
  formClient : FormGroup;
  @Input() client: Client;
  @Output() submitForm: EventEmitter<Client> = new EventEmitter<Client>();

  constructor(private router: Router, private data: Data, private route: ActivatedRoute) { 
    this.formClient = new FormGroup( {
      nom: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*$')]),
      prenom: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*$')]),
      civilite: new FormControl('', [Validators.required]),
      telephone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}$')]),
      ville: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z- ]*$')]),
      adresse: new FormControl('', [Validators.required]),
      cp: new FormControl('', [Validators.required, Validators.pattern('[0-9]*$')]),
      pays: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$')]),
      login: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]*$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9%_*.$&]*$')])
    })
  }

  ngOnInit() {
    this.client = new Client();
  }

  onSubmit() {
    if(this.formClient.invalid) {
      alert("FORMULAIRE INVALIDE!");
      return;
    }

    // ON ENTRE LES DONNEES
    this.client.nom=this.formClient.controls["nom"].value;
    this.client.prenom=this.formClient.controls["prenom"].value;
    this.client.civilite=this.formClient.controls["civilite"].value;
    this.client.telephone=this.formClient.controls["telephone"].value;
    this.client.ville=this.formClient.controls["ville"].value;
    this.client.adresse=this.formClient.controls["adresse"].value;
    this.client.cp=this.formClient.controls["cp"].value;
    this.client.pays=this.formClient.controls["pays"].value;
    this.client.email=this.formClient.controls["email"].value;
    this.client.login=this.formClient.controls["login"].value;
    this.client.password=this.formClient.controls["password"].value;

    console.log(this.client);
    
    this.submitForm.emit(this.client);
    this.data.storage = this.client;
    this.router.navigate(['/formClient/visualisation']);
  }
}
