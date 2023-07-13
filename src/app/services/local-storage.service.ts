import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setCode(code: string) {
    localStorage.setItem('code', code);
  }

  getCode(): string {
    const code = localStorage.getItem('code');
    if (code) {
      return code;
    }
    return '';
  }

  setHost(host: string) {
    localStorage.setItem('host', host);
  }

  getHost(): string {
    const host = localStorage.getItem('host');
    if (host) {
      return host;
    }
    return '';
  }

  setPort(port: string) {
    localStorage.setItem('port', port);
  }

  getPort(): number {
    const port = localStorage.getItem('port');
    if (port) {
      return parseInt(port);
    }
    return 0;
  }

  setAPIKey(apiKey: string) {
    localStorage.setItem('apiKey', apiKey);
  }

  getAPIKey(): string {
    const apiKey = localStorage.getItem('apiKey');
    if (apiKey) {
      return apiKey;
    }
    return '';
  }

  setAlignment(alignment: string) {
    localStorage.setItem('alignment', alignment);
  }

  getAlignment(): string {
    const alignment = localStorage.getItem('alignment');
    if (alignment) {
      return alignment;
    }
    return 'vertical';
  }
}
