import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BalanceRepoService } from 'src/app/shared/data/repositories/balance-repo.service';
import { PaymentMethodComponent } from './payment-method/payment-method.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  @ViewChild(PaymentMethodComponent, {static: false}) paymentMethod:PaymentMethodComponent;
  private _vendingMachineCreditBalanceSubscriber: Subscription;
  private _vendingMachineCashBalanceSubscriber: Subscription;
  private _quantityOfCansSoldSubscriber: Subscription;
  _vendingMachineCreditBalance?: number = 0.00;
  _vendingMachineCashBalance?: number = 0.00;
  _quantityOfCansSold?: number = 0;

  constructor(
    private _balanceRepoService: BalanceRepoService,
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
  }

  ngOnDestroy() {
    if (this._vendingMachineCreditBalanceSubscriber) { this._vendingMachineCreditBalanceSubscriber.unsubscribe(); }
    if (this._vendingMachineCashBalanceSubscriber) { this._vendingMachineCashBalanceSubscriber.unsubscribe(); }
    if (this._quantityOfCansSoldSubscriber) { this._quantityOfCansSoldSubscriber.unsubscribe(); }
  }
  triggerPurchase(event) {
    this.paymentMethod.setSelectedDrink(event);
  }

}

