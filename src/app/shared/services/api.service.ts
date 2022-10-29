import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _httpClient: HttpClient,
    private _notificationService: NotificationService
  ) {
  }

  //#region Helpers.
  private getHttpHeaders(contentType: string): HttpHeaders {
    let authorization: string = '';
    let httpHeaders: HttpHeaders = null;

    authorization = 'bearer ' + 'your_system_token';
    if (contentType) {
      httpHeaders = new HttpHeaders({ 'Content-Type': contentType, 'Authorization': authorization });
    } else {
      httpHeaders = new HttpHeaders({ 'Authorization': authorization });
    }

    return httpHeaders;
  }

  private redirectToLogIn() {
    this._notificationService.showError(null, 'Authentication required.');
    // Redirect to login page with returned url.
  }
  //#endregion.

  //#region Main methods.
  httpClientGet(url: string, data: any): Observable<any> {
    let isOk = false, response = null, error = null;
    let options = {
      params: data,
      headers: this.getHttpHeaders('application/json'),
    };

    return new Observable((observer) => {
      this._httpClient.get(url, options)
        .subscribe(
          (res) => {
            response = res;
            isOk = true;
          },
          (err) => {
            error = err;
          }
        )
        .add(() => {
          if (isOk) {
            observer.next(response);
          }
          else {
            if (error && error.status === 401) {
              this.redirectToLogIn();
            }
            observer.error(error);
          }
          observer.complete();
        });
    });
  }

  httpClientGetWithHeaders(url: string, data: any): Observable<any> {
    let isOk = false, response = null, error = null;

    return new Observable((observer) => {
      this._httpClient.get(url, { params: data, headers: this.getHttpHeaders('application/json'), observe: 'response' })
        .subscribe(
          (res) => {
            response = res;
            isOk = true;
          },
          (err) => {
            error = err;
          }
        )
        .add(() => {
          if (isOk) {
            observer.next(response);
          }
          else {
            if (error && error.status === 401) {
              this.redirectToLogIn();
            }
            observer.error(error);
          }
          observer.complete();
        });
    });
  }

  httpClientPut(url: string, data: any, httpHeaders: HttpHeaders = null): Observable<any> {
    let isOk = false, response = null, error = null;
    const httpOptions = { headers: !httpHeaders ? this.getHttpHeaders('application/json') : httpHeaders };

    return new Observable((observer) => {
      this._httpClient.put(url, data, httpOptions)
        .subscribe(
          (res) => {
            response = res;
            isOk = true;
          },
          (err) => {
            error = err;
            console.error('error is: ' + JSON.stringify(error));
          }
        )
        .add(() => {
          if (isOk) {
            observer.next(response);
          }
          else {
            if (error && error.status === 401) {
              this.redirectToLogIn();
            }
            observer.error(error);
          }
          observer.complete();
        });
    });
  }
  //#endregion.
}
