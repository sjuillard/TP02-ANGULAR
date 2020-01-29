import { Component } from '@angular/core';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Sool Technologies';

  client: Client = new Client();
  isConnected : boolean = false;

  onClientRegister(client: Client) {
    this.client = client;
  }

  connectUser() {
    this.isConnected = true;
  }
}
