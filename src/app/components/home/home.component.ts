import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PaymentMethodComponent } from './payment-method/payment-method.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  @ViewChild(PaymentMethodComponent, {static: false}) paymentMethod:PaymentMethodComponent;

  constructor() { }

  ngOnInit() {
  }

  triggerPurchase(event) {
    this.paymentMethod.setSelectedDrink(event);
  }

}
