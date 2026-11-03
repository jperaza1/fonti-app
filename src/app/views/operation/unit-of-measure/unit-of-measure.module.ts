import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUnitOfMeasureComponent } from './list-unit-of-measure/list-unit-of-measure.component';
import { CreateOrUpdateUnitOfMeasureComponent } from './create-or-update-unit-of-measure/create-or-update-unit-of-measure.component';
import { SharedModule } from '../../shared/shared.module';
import { UnitOfMeasureRoutingModule } from './unit-of-measure-routing.module';

@NgModule({
  declarations: [ListUnitOfMeasureComponent, CreateOrUpdateUnitOfMeasureComponent],
  imports: [CommonModule, SharedModule, UnitOfMeasureRoutingModule],
})
export class UnitOfMeasureModule {}
