import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDispatchControlComponent } from './list-dispatch-control/list-dispatch-control.component';
import { CreateOrUpdateDispatchControlComponent } from './create-or-update-dispatch-control/create-or-update-dispatch-control.component';
import { SharedModule } from '../../shared/shared.module';
import { DispatchControlRoutingModule } from './dispatch-control-routing.module';



@NgModule({
  declarations: [ListDispatchControlComponent, CreateOrUpdateDispatchControlComponent],
  imports: [
    CommonModule,
    SharedModule,
    DispatchControlRoutingModule
  ]
})
export class DispatchControlModule { }
