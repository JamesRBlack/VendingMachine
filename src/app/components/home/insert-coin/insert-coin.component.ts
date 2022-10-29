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

  //#region Lifecycle.
  ngOnInit() {
  }

  ngOnDestroy() {
    if (this._balanceObservableSubscriber) { this._balanceObservableSubscriber.unsubscribe(); }
  }
  //#endregion

  //#region Helpers.
  //#endregion

  //#region Main methods.
  addCashBalance(amount: number) {
    this._balanceRepoService.addCashBalance(amount)
      .subscribe(() => { }, (err) => { })
      .add(() => {});
  }
  //#endregion
}
