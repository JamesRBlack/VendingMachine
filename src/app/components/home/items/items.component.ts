import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BalanceRepoService } from 'src/app/shared/data/repositories/balance-repo.service';
import { ItemRepoService } from 'src/app/shared/data/repositories/item-repo.service';
import { Item } from 'src/app/shared/models/item.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, OnDestroy {
  private _balanceObservableSubscriber: Subscription;
  _items: Item[] = [];
  private _itemsObservableSubscriber: Subscription;
  _balance?: number = 0;
  private selectedDrink: Item = null;

  @Output() selectedDrinkEvent = new EventEmitter<Item>();

  constructor(
    private _itemRepoService: ItemRepoService,
    private _commonService: CommonService
  ) {
  }

  ngOnInit() {
    this._itemsObservableSubscriber = this._itemRepoService.itemsObservable.subscribe(data => {
      this._items = JSON.parse(JSON.stringify(data));
    });
    this._commonService.getList().subscribe(data => {});
  }

  ngOnDestroy() {
    if (this._itemsObservableSubscriber) { this._itemsObservableSubscriber.unsubscribe(); }
    if (this._balanceObservableSubscriber) { this._balanceObservableSubscriber.unsubscribe(); }
  }

  onSelectDrink(item: Item) {
    this.selectedDrink = item;
    this.selectedDrinkEvent.emit(item);
  }


  //#endregion.
}
