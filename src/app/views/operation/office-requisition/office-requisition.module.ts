import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOfficeRequisitionComponent } from './list-office-requisition/list-office-requisition.component';
import { CreateOrUpdateOfficeRequisitionComponent } from './create-or-update-office-requisition/create-or-update-office-requisition.component';
import { SharedModule } from '../../shared/shared.module';
import { OfficeRequisitionRoutingModule } from './special-service-routing.module';



@NgModule({
  declarations: [ListOfficeRequisitionComponent, CreateOrUpdateOfficeRequisitionComponent],
  imports: [
    CommonModule,
    SharedModule,
    OfficeRequisitionRoutingModule
  ]
})
export class OfficeRequisitionModule { }
