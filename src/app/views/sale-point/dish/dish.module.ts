import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDishComponent } from './list-dish/list-dish.component';
import { CreateOrUpdateDishComponent } from './create-or-update-dish/create-or-update-dish.component';
import { SharedModule } from '../../shared/shared.module';
import { DishRoutingModule } from './dish-routing.module';



@NgModule({
  declarations: [ListDishComponent, CreateOrUpdateDishComponent],
  imports: [
    CommonModule,
    SharedModule,
    DishRoutingModule
  ]
})
export class DishModule { }
