import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public static host: string = 'localhost';
  public static port: number = 52773;

  constructor(private http: HttpClient) {}

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

  executeCode(pCode: string): Observable<any> {
    return this.http
      .post(
        'http://' +
          ApiService.host +
          ':' +
          ApiService.port +
          '/terminalplus/execute',
        { code: pCode }
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw new Error('unknown error: ' + err.status);
        })
      );
  }
}
