import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInventoryComponent } from './list-inventory/list-inventory.component';
import { CreateOrUpdateInventoryComponent } from './create-or-update-inventory/create-or-update-inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ResumeInventoryComponent } from './resume-inventory/resume-inventory.component';



@NgModule({
  declarations: [ListInventoryComponent, CreateOrUpdateInventoryComponent, ResumeInventoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    InventoryRoutingModule
  ]
})
export class InventoryModule { }
