import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemRepoService } from '../data/repositories/item-repo.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private _itemRepoService: ItemRepoService,
    private _notificationService: NotificationService
  ) { }

  public getList(): Observable<any> {
    return new Observable((subscriber) => {
      try {
        this._itemRepoService.getList(null)
          .subscribe(() => {  subscriber.next(); }, (err) => { this._notificationService.showError(null, 'GET data failed.'); error = err; })
      } catch (error) {
        subscriber.error(error);
      }
      subscriber.complete();
    });
  }
}
