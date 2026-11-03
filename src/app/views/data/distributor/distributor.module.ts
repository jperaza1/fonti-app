import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDistributorComponent } from './list-distributor/list-distributor.component';
import { CreateOrUpdateDistributorComponent } from './create-or-update-distributor/create-or-update-distributor.component';
import { SharedModule } from '../../shared/shared.module';
import { DistributorRoutingModule } from './distributor-routing.module';

@NgModule({
  declarations: [ListDistributorComponent, CreateOrUpdateDistributorComponent],
  imports: [CommonModule, SharedModule, DistributorRoutingModule],
})
export class DistributorModule {}
