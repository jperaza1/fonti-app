import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListKardexComponent } from './list-kardex/list-kardex.component';
import { SharedModule } from '../../shared/shared.module';
import { KardexRoutingModule } from './kardex-routing.module';

@NgModule({
  declarations: [ListKardexComponent],
  imports: [CommonModule, SharedModule, KardexRoutingModule],
})
export class KardexModule {}
