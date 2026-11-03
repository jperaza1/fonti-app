import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ListBankAccountComponent } from './list-bank-account/list-bank-account.component';
import { CreateOrUpdateBankAccountComponent } from './create-or-update-bank-account/create-or-update-bank-account.component';
import { BankAccountRoutingModule } from './bank-account-routing.module';

@NgModule({
  declarations: [ListBankAccountComponent, CreateOrUpdateBankAccountComponent],
  imports: [CommonModule, SharedModule, BankAccountRoutingModule],
})
export class BankAccountModule {}
