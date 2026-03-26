import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCorrelativeComponent } from './list-correlative/list-correlative.component';
import { CreateOrUpdateCorrelativeComponent } from './create-or-update-correlative/create-or-update-correlative.component';
import { SharedModule } from '../../shared/shared.module';
import { CorrelativeRoutingModule } from './correlative-routing.module';

@NgModule({
  declarations: [ListCorrelativeComponent, CreateOrUpdateCorrelativeComponent],
  imports: [CommonModule, SharedModule, CorrelativeRoutingModule],
})
export class CorrelativeModule {}
