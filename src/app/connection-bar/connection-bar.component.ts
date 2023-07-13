import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-connection-bar',
  templateUrl: './connection-bar.component.html',
  styleUrls: ['./connection-bar.component.sass'],
})
export class ConnectionBarComponent {
  port: number = 0;
  host: string = '';
  apiKey: string = '';

  constructor(private localStorageService: LocalStorageService) {
    this.host = this.localStorageService.getHost();
    this.port = this.localStorageService.getPort();
    this.apiKey = this.localStorageService.getAPIKey();
    ApiService.host = this.host;
    ApiService.port = this.port;
    ApiService.setAPIKey(this.apiKey);
  }

  connect() {
    ApiService.host = this.host;
    ApiService.port = this.port;
    ApiService.setAPIKey(this.apiKey);
    this.localStorageService.setHost(this.host);
    this.localStorageService.setPort(this.port.toString());
    this.localStorageService.setAPIKey(this.apiKey);
  }

  getWidth() {
    return window.innerWidth * 0.8;
  }
}
