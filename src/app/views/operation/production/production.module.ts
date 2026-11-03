import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductionRoutingModule } from './production-routing.module';
import { ListProductionComponent } from './list-production/list-production.component';
import { CreateProductionComponent } from './create-production/create-production.component';

@NgModule({
  declarations: [ListProductionComponent, CreateProductionComponent],
  imports: [CommonModule, SharedModule, ProductionRoutingModule],
})
export class ProductionModule {}
