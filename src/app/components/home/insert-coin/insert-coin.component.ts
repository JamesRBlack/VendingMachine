import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BalanceRepoService } from 'src/app/shared/data/repositories/balance-repo.service';

@Component({
  selector: 'app-insert-coin',
  templateUrl: './insert-coin.component.html',
  styleUrls: ['./insert-coin.component.scss']
})
export class InsertCoinComponent implements OnInit, OnDestroy {
  private _balance?: number = 0;
  private _balanceObservableSubscriber: Subscription;

  constructor(
    private _balanceRepoService: BalanceRepoService,
  ) {
    // Listen to the balance changes.
    this._balanceObservableSubscriber = this._balanceRepoService.balanceObservable.subscribe(data => {
      this._balance = data;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._balanceObservableSubscriber) { this._balanceObservableSubscriber.unsubscribe(); }
  }
  addCustomerCashBalance(amount: number) {
    this._balanceRepoService.addCustomerCashBalance(amount)
      .subscribe(() => { }, (err) => { })
      .add(() => {});
  }

}
