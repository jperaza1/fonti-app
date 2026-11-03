import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTruckComponent } from './list-truck/list-truck.component';
import { CreateOrUpdateTruckComponent } from './create-or-update-truck/create-or-update-truck.component';
import { SharedModule } from '../../shared/shared.module';
import { TruckRoutingModule } from './truck-routing.module';

@NgModule({
  declarations: [ListTruckComponent, CreateOrUpdateTruckComponent],
  imports: [CommonModule, SharedModule, TruckRoutingModule],
})
export class TruckModule {}
