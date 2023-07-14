import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private static _apiKey: string = '';
  public static host: string = 'localhost';
  public static port: number = 52773;

  constructor(private http: HttpClient) {}

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
