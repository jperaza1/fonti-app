import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListProductComponent } from './list-product/list-product.component';



const routes: Routes = [
  { path: '', component: ListProductComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }