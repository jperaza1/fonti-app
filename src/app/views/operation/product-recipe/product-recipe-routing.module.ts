import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListProductRecipeComponent } from './list-product-recipe/list-product-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductRecipeComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRecipeRoutingModule {}
