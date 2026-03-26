import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CreateOrUpdateCategoryComponent } from './create-or-update-category/create-or-update-category.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
  declarations: [ListCategoryComponent, CreateOrUpdateCategoryComponent],
  imports: [CommonModule, SharedModule, CategoryRoutingModule],
})
export class CategoryModule {}
