import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSwitchModule } from 'devextreme-angular/ui/switch';
import { SharedModule } from '../../shared/shared.module';
import { ExpenseRoutingModule } from './expense-routing.module';
import { ListExpenseComponent } from './list-expense/list-expense.component';
import { CreateOrUpdateExpenseComponent } from './create-or-update-expense/create-or-update-expense.component';
import { VendorModule } from '../../data/vendor/vendor.module';

@NgModule({
  declarations: [ListExpenseComponent, CreateOrUpdateExpenseComponent],
  imports: [CommonModule, SharedModule, ExpenseRoutingModule, VendorModule, DxSwitchModule],
})
export class ExpenseModule {}
