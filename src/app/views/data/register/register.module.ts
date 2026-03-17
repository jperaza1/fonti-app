import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRegisterComponent } from './list-register/list-register.component';
import { CreateOrUpdateRegisterComponent } from './create-or-update-register/create-or-update-register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [ListRegisterComponent, CreateOrUpdateRegisterComponent],
  imports: [
    CommonModule,
    SharedModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }
