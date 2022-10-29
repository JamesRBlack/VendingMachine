import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { Item } from '../../models/item.model';
import { ApiService } from '../../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ItemRepoService {
  private _dataStore: { items: Item[] };
  private _itemsBehaviorSubject: BehaviorSubject<Item[]> = new BehaviorSubject([]);
  itemsObservable: Observable<Item[]>;

  constructor(
    private _apiService: ApiService,
  ) {
    this._dataStore = { items: [] };
    this.itemsObservable = this._itemsBehaviorSubject.asObservable();
  }

  //#region Helpers.
  //#endregion.

  //#region Main methods.
  getList(paramObj: any): Observable<any> {
    let isOk = false, response = null, error = null;

    return new Observable((observer) => {
      this._apiService.httpClientGetWithHeaders(AppConstants.apiUrl, paramObj)
        .subscribe((res) => {response = res; isOk = true;}, (err) => {error = err;})
        .add(() => {
          if (isOk) {
            this._dataStore.items = response.body;
            this._itemsBehaviorSubject.next(Object.assign([], this._dataStore.items));
            observer.next();
          }
          else {
            console.error('ItemRepoService getList failed. Error is: ' + JSON.stringify(error));
            observer.error(error);
          }
          observer.complete();
        });
    });
  }

  updatePost(paramObj: Item): Observable<Item> {
    let isOk = false, response: Item = null, error = null;

    return new Observable((observer) => {
      this._apiService.httpClientPut(`${AppConstants.apiUrl}/${paramObj.id}`, paramObj)
        .subscribe(
          (res) => { response = res, isOk = true; },
          (err) => { error = err; }
        )
        .add(() => {
          if (isOk) {
            let updatingItemIndex = this._dataStore.items.findIndex(item => item.id == response.id);
            if (updatingItemIndex !== -1) {
              this._dataStore.items[updatingItemIndex] = response;
              this._itemsBehaviorSubject.next(Object.assign([], this._dataStore.items));
            }
            observer.next();
          }
          else {
            console.error('ItemRepoService updatePost failed. Error is: ' + JSON.stringify(error));
            observer.error(error);
          }
          observer.complete();
        });
    });
  }


  restockVendingMachine(paramObj: Item): Observable<Item> {
    let isOk = false, response: Item = null, error = null;

    return new Observable((observer) => {
      this._apiService.httpClientPut(`${AppConstants.apiUrl}/${paramObj.id}`, paramObj)
        .subscribe(
          (res) => { response = res, isOk = true; },
          (err) => { error = err; }
        )
        .add(() => {
          if (isOk) {
            let updatingItemIndex = this._dataStore.items.findIndex(item => item.id == response.id);
            if (updatingItemIndex !== -1) {
              this._dataStore.items[updatingItemIndex] = response;
              this._itemsBehaviorSubject.next(Object.assign([], this._dataStore.items));
            }
            observer.next();
          }
          else {
            console.error('ItemRepoService updatePost failed. Error is: ' + JSON.stringify(error));
            observer.error(error);
          }
          observer.complete();
        });
    });
  }
  //#endregion.
}
