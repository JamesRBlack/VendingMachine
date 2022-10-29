import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BalanceRepoService } from 'src/app/shared/data/repositories/balance-repo.service';
import { ItemRepoService } from 'src/app/shared/data/repositories/item-repo.service';
import { Item } from 'src/app/shared/models/item.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { PaymentMethodComponent } from './payment-method/payment-method.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  @ViewChild(PaymentMethodComponent, {static: false}) paymentMethod:PaymentMethodComponent;
  _items: Item[] = [];
  private _vendingMachineCreditBalanceSubscriber: Subscription;
  private _vendingMachineCashBalanceSubscriber: Subscription;
  private _quantityOfCansSoldSubscriber: Subscription;
  private _itemsObservableSubscriber: Subscription;
  _vendingMachineCreditBalance?: number = 0.00;
  _vendingMachineCashBalance?: number = 0.00;
  _quantityOfCansSold?: number = 0;

  constructor(
    private _balanceRepoService: BalanceRepoService,
    private _itemRepoService: ItemRepoService,
    private _commonService: CommonService
  ) {
  }

  
  //#region Lifecycle.
  ngOnInit() {
    // Listeners.
    this._vendingMachineCreditBalanceSubscriber = this._balanceRepoService.vendingMachineCreditBalanceObservable.subscribe(data => {
      this._vendingMachineCreditBalance = data;
    });
    this._vendingMachineCashBalanceSubscriber = this._balanceRepoService.vendingMachineCashBalanceObservable.subscribe(data => {
      this._vendingMachineCashBalance = data;
    });
    this._quantityOfCansSoldSubscriber = this._balanceRepoService.quantityOfCansSoldObservable.subscribe(data => {
      this._quantityOfCansSold = data;
    });    
    this._itemsObservableSubscriber = this._itemRepoService.itemsObservable.subscribe(data => {
      this._items = JSON.parse(JSON.stringify(data));
    });
  }

  ngOnDestroy() {
    if (this._vendingMachineCreditBalanceSubscriber) { this._vendingMachineCreditBalanceSubscriber.unsubscribe(); }
    if (this._vendingMachineCashBalanceSubscriber) { this._vendingMachineCashBalanceSubscriber.unsubscribe(); }
    if (this._quantityOfCansSoldSubscriber) { this._quantityOfCansSoldSubscriber.unsubscribe(); }
  }

  triggerPurchase(event) {
    this.paymentMethod.setSelectedDrink(event);
  }

  restockMachine() {
     this._commonService.getList().subscribe(() => {
    }, (err) => { console.log(err)});
     this._balanceRepoService.resetVendingMachine().subscribe(() => {
    }, (err) => { console.log(err)});
    this._itemRepoService.restockVendingMachine(this._items).subscribe(() => {
    }, (err) => { console.log(err)});
  }
}

