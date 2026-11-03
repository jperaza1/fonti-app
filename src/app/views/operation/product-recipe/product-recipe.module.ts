import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductRecipeComponent } from './list-product-recipe/list-product-recipe.component';
import { CreateOrUpdateProductRecipeComponent } from './create-or-update-product-recipe/create-or-update-product-recipe.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductRecipeRoutingModule } from './product-recipe-routing.module';

@NgModule({
  declarations: [ListProductRecipeComponent, CreateOrUpdateProductRecipeComponent],
  imports: [CommonModule, SharedModule, ProductRecipeRoutingModule],
})
export class ProductRecipeModule {}
