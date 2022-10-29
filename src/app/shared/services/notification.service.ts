import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private _toastrService: ToastrService,
  ) { }

  /**
  * Show success toastr.
  * @param message This can be your custom message or the value of key `statusText` of response.
  * @param title This can be your custom title.
  */
  showSuccess(message: string, title: string): void {
    this._toastrService.success(message, title);
  }

  /**
  * Show error toastr.
  * @param error This can be error response.
  * @param message This can be the key `statusText` of response.
  * @param title This can be your custom title.
  */
  showError(error: any, message: string, title: string = ''): void {
    if (error && error.error) {
      let isErrorAnObject = (typeof error.error === 'object' ? true : false);
      
      if (isErrorAnObject) {
        for (let k in error.error) {
          if (error.error.hasOwnProperty(k)) {
            this._toastrService.error(error.error[k]);
            // this._toastrService.error(k + ': ' + error.error[k]);
          }
        }
      } else {
        this._toastrService.error(error.error, title);
      }
    }
    else {
      this._toastrService.error(message, title);
    }
  }

  /**
  * Show warning toastr.
  * @param message This can be your custom message or the value of key `statusText` of response.
  * @param title This can be your custom title.
  */
  showWarning(message: string, title: string): void {
    this._toastrService.warning(message, title);
  }

  /**
  * Show info toastr.
  * @param message This can be your custom message or the value of key `statusText` of response.
  * @param title This can be your custom title.
  */
  showInfo(message: string, title: string): void {
    this._toastrService.info(message, title);
  }
}
