import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSpecialServiceComponent } from './list-special-service/list-special-service.component';
import { CreateOrUpdateSpecialServiceComponent } from './create-or-update-special-service/create-or-update-special-service.component';
import { SharedModule } from '../../shared/shared.module';
import { SpecialServiceRoutingModule } from './special-service-routing.module';



@NgModule({
  declarations: [ListSpecialServiceComponent, CreateOrUpdateSpecialServiceComponent],
  imports: [
    CommonModule,
    SharedModule,
    SpecialServiceRoutingModule
  ]
})
export class SpecialServiceModule { }
