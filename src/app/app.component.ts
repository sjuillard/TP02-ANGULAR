import { Component } from '@angular/core';
import { Client } from './client.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'TP02-Angular';

  private client: Client = new Client();

  onClientRegister(client: Client) {
    this.client = client;
  }
}
