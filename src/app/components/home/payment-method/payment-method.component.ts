import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BalanceRepoService } from 'src/app/shared/data/repositories/balance-repo.service';
import { ItemRepoService } from 'src/app/shared/data/repositories/item-repo.service';
import { Item } from 'src/app/shared/models/item.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import {PaymentMethods}  from 'src/app/shared/consts/paymentTypes.consts';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit {

  private _balanceObservableSubscriber: Subscription;
  _items: Item[] = [];
  private _itemsObservableSubscriber: Subscription;
  _balance?: number = 0;
  private selectedDrink: Item = null;

  constructor(
    private _balanceRepoService: BalanceRepoService,
    private _itemRepoService: ItemRepoService,
    private _notificationService: NotificationService,
  ) {
  }

  //#region Lifecycle.
  ngOnInit() {
    // Listeners.
    this._balanceObservableSubscriber = this._balanceRepoService.balanceObservable.subscribe(data => {
      this._balance = data;
    });
    this._itemsObservableSubscriber = this._itemRepoService.itemsObservable.subscribe(data => {
      this._items = JSON.parse(JSON.stringify(data));
    });
  }

  ngOnDestroy() {
    if (this._itemsObservableSubscriber) { this._itemsObservableSubscriber.unsubscribe(); }
    if (this._balanceObservableSubscriber) { this._balanceObservableSubscriber.unsubscribe(); }
  }


  //#region Helpers.
  private _dispenseItem(dispensingItem: Item, paymentMethodType: String) {
      if (paymentMethodType === PaymentMethods.CASH && this._balance < dispensingItem.cost) {
        this._notificationService.showWarning('Insufficient balance. Please insert coin.', null);
        return;
      }

      dispensingItem.remaining -= 1;
      // Update the dispensingItem.
      let isOk = false, error = null;
      this._itemRepoService.updatePost(dispensingItem)
        .subscribe(() => { isOk = true; }, (err) => { error = err; })
        .add(() => {
          if (isOk) {
            if (paymentMethodType === PaymentMethods.CASH) {
              this._balanceRepoService.deductCashBalance(dispensingItem.cost).subscribe(() => { }, (err) => { })
              .add(() => {});
              this._balanceRepoService.addVendingMachineCashBalance(dispensingItem.cost).subscribe(() => { }, (err) => { })
              .add(() => {});
            } else if (paymentMethodType === PaymentMethods.CARD) {
              this._balanceRepoService.addVendingMachineCreditBalance(dispensingItem.cost).subscribe(() => { }, (err) => { })
              .add(() => {});
            }
            this._balanceRepoService.addQuantityOfCansSold(1).subscribe(() => { }, (err) => { })
            .add(() => {});
            this._notificationService.showSuccess(null, `Dispensed item ${dispensingItem.name} successfully. Enjoy your ${dispensingItem.name}.`)
          } else {
            this._notificationService.showError(error, `Dispensed item ${dispensingItem.name} failed.`);
          }
        });
  }


  setSelectedDrink(pSelectedDrink: Item) {
    this.selectedDrink = pSelectedDrink;
  }

  payWithCash() {
    const foundItem = this.findItem()
    this._dispenseItem(foundItem , PaymentMethods.CASH);
       /* this._notificationService.showSuccess('Dispensing item: ' + foundItem.name, null); */
  }

  payWithCard() {
      const foundItem = this.findItem()
      this._dispenseItem(foundItem, PaymentMethods.CARD);
  }
  
  private findItem() {
    return this._items.find(item => item.id == this.selectedDrink.id);
  }

}
