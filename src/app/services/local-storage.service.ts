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
}
