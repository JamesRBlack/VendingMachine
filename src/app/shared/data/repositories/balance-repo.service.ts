import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceRepoService {
  private _dataStore: { balance: number, cashBalance: number, creditBalance: number, quantityOfCansSold: number};
  private _balanceBehaviorSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private _vendingMachineCashBalanceBehaviorSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private _vendingMachineCreditBalanceSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  private _quantityOfCansSoldSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  balanceObservable: Observable<number>;
  vendingMachineCashBalanceObservable: Observable<number>;
  vendingMachineCreditBalanceObservable: Observable<number>;
  quantityOfCansSoldObservable: Observable<number>;


  constructor(
  ) {
    this._dataStore = { balance: 0, cashBalance: 0, creditBalance: 0, quantityOfCansSold: 0};
    this.balanceObservable = this._balanceBehaviorSubject.asObservable();
    this.vendingMachineCashBalanceObservable = this._vendingMachineCashBalanceBehaviorSubject.asObservable();
    this.vendingMachineCreditBalanceObservable = this._vendingMachineCreditBalanceSubject.asObservable();
    this.quantityOfCansSoldObservable = this._quantityOfCansSoldSubject.asObservable();
  }

  addCustomerCashBalance(amount: number): Observable<number> {
    return new Observable((subscriber) => {
      try {
        this._dataStore.balance += amount;
        this._balanceBehaviorSubject.next(this._dataStore.balance)
        subscriber.next();
      } catch (error) {
        subscriber.error(error);
      }
      
      subscriber.complete();
    });
  }

  addVendingMachineCashBalance(amount: number): Observable<number> {
    return new Observable((subscriber) => {
      try {
        this._dataStore.cashBalance += amount;
        this._vendingMachineCashBalanceBehaviorSubject.next(this._dataStore.cashBalance)
        subscriber.next();
      } catch (error) {
        subscriber.error(error);
      }
      
      subscriber.complete();
    });
  }

  addVendingMachineCreditBalance(amount: number): Observable<number> {
    return new Observable((subscriber) => {
      try {
        this._dataStore.creditBalance += amount;
        this._vendingMachineCreditBalanceSubject.next(this._dataStore.creditBalance)
        subscriber.next();
      } catch (error) {
        subscriber.error(error);
      }
      
      subscriber.complete();
    });
  }

  addQuantityOfCansSold(amount: number): Observable<number> {
    return new Observable((subscriber) => {
      try {
        this._dataStore.quantityOfCansSold += amount;
        this._quantityOfCansSoldSubject.next(this._dataStore.quantityOfCansSold)
        subscriber.next();
      } catch (error) {
        subscriber.error(error);
      }
      
      subscriber.complete();
    });
  }


  resetVendingMachine(): Observable<number> {
    return new Observable((subscriber) => {
      try {
        this._dataStore.balance = 0;
        this._dataStore.creditBalance = 0;
        this._dataStore.cashBalance = 0;
        this._dataStore.quantityOfCansSold = 0;
        this._balanceBehaviorSubject.next(this._dataStore.balance);
        this._vendingMachineCashBalanceBehaviorSubject.next(this._dataStore.cashBalance);
        this._vendingMachineCreditBalanceSubject.next(this._dataStore.creditBalance);
        this._quantityOfCansSoldSubject.next(this._dataStore.quantityOfCansSold);
        subscriber.next();
      } catch (error) {
        subscriber.error(error);
      }
      
      subscriber.complete();
    });
  }

  deductCashBalance(amount: number): Observable<number> {
    return new Observable((subscriber) => {
      try {
        this._dataStore.balance -= amount;
        this._balanceBehaviorSubject.next(this._dataStore.balance);
        subscriber.next();
      } catch (error) {
        subscriber.error(error);
      }
      
      subscriber.complete();
    });
  }
}
