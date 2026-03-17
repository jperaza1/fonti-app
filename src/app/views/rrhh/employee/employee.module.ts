import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { CreateOrUpdateEmployeeComponent } from './create-or-update-employee/create-or-update-employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RequestVacationComponent } from './request-vacation/request-vacation.component';



@NgModule({
  declarations: [ListEmployeeComponent, CreateOrUpdateEmployeeComponent, RequestVacationComponent],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
