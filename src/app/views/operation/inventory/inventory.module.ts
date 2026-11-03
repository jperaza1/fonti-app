import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListInventoryComponent } from './list-inventory/list-inventory.component';
import { InventoryMovementComponent } from './inventory-movement/inventory-movement.component';
import { SharedModule } from '../../shared/shared.module';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  declarations: [ListInventoryComponent, InventoryMovementComponent],
  imports: [CommonModule, SharedModule, InventoryRoutingModule],
})
export class InventoryModule {}
