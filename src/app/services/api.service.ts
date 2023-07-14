import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private static _apiKey: string = '';
  public static host: string = 'localhost';
  public static port: number = 52773;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    ApiService.host = this.localStorageService.getHost();
    ApiService.port = this.localStorageService.getPort();
  }

  static setAPIKey(pApiKey: string) {
    ApiService._apiKey = pApiKey;
  }

  isServerOnline() {
    return this.http
      .get<string>(
        'http://' +
          ApiService.host +
          ':' +
          ApiService.port +
          '/terminalplus/ping'
      )
      .pipe(
        catchError((err) => {
          throw new Error('error');
        })
      );
  }

  executeCode(pCode: string, namespace: string): Observable<any> {
    return this.http
      .post(
        'http://' +
          ApiService.host +
          ':' +
          ApiService.port +
          '/terminalplus/execute?apikey=' +
          ApiService._apiKey,
        { code: pCode, namespace: namespace }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status == 401) {
            throw new Error('Invalid API key');
          } else if (err.status == 0) {
            throw new Error('Could not connect to server!');
          } else if (err.status == 500) {
            throw new Error('Something went wrong!');
          }
          throw new Error('unknown error: ' + err.status);
        })
      );
  }
  getAllNamespaces(): Observable<any> {
    return this.http
      .get(
        'http://' +
          ApiService.host +
          ':' +
          ApiService.port +
          '/terminalplus/namespaces/get/all'
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status == 500) {
            throw new Error('Something went wrong!');
          }
          throw new Error('unknown error: ' + err.status);
        })
      );
  }
}
