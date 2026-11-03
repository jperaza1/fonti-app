import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBankComponent } from './list-bank/list-bank.component';
import { CreateOrUpdateBankComponent } from './create-or-update-bank/create-or-update-bank.component';
import { SharedModule } from '../../shared/shared.module';
import { BankRoutingModule } from './bank-routing.module';

@NgModule({
  declarations: [ListBankComponent, CreateOrUpdateBankComponent],
  imports: [CommonModule, SharedModule, BankRoutingModule],
})
export class BankModule {}
