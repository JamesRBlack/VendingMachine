import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { InsertCoinComponent } from './insert-coin/insert-coin.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ItemsComponent } from './items/items.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomeComponent, InsertCoinComponent, ItemsComponent, PaymentMethodComponent,],
  imports: [
    CommonModule,
    HomeRoutingModule,

    SharedModule,
  ]
})
export class HomeModule { }
