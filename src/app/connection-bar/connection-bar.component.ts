import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';
import { NamespaceService } from '../services/namespace.service';

@Component({
  selector: 'app-connection-bar',
  templateUrl: './connection-bar.component.html',
  styleUrls: ['./connection-bar.component.sass'],
})
export class ConnectionBarComponent {
  port: number = 0;
  host: string = '';
  apiKey: string = '';
  namespace: string = '';

  constructor(
    private localStorageService: LocalStorageService,
    private namespaceService: NamespaceService
  ) {
    this.host = this.localStorageService.getHost();
    this.port = this.localStorageService.getPort();
    this.apiKey = this.localStorageService.getAPIKey();
    ApiService.host = this.host;
    ApiService.port = this.port;
    ApiService.setAPIKey(this.apiKey);
    this.namespace = this.namespaceService.getCurrNamespace();
  }

  connect() {
    ApiService.host = this.host;
    ApiService.port = this.port;
    ApiService.setAPIKey(this.apiKey);
    this.localStorageService.setHost(this.host);
    this.localStorageService.setPort(this.port.toString());
    this.localStorageService.setAPIKey(this.apiKey);
    this.namespaceService.setCurrNamespace(this.namespace);
  }

  getWidth() {
    return window.innerWidth * 0.8;
  }

  getNamespacesService() {
    return this.namespaceService;
  }
}
