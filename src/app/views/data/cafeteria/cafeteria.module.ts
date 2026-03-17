import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCafeteriaComponent } from './list-cafeteria/list-cafeteria.component';
import { CreateOrUpdateCafeteriaComponent } from './create-or-update-cafeteria/create-or-update-cafeteria.component';
import { SharedModule } from '../../shared/shared.module';
import { CafeteriaRoutingModule } from './cafeteria-routing.module';



@NgModule({
  declarations: [ListCafeteriaComponent, CreateOrUpdateCafeteriaComponent],
  imports: [
    CommonModule,
    SharedModule,
    CafeteriaRoutingModule
  ]
})
export class CafeteriaModule { }
