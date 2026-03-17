import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../../../../_helpers/auth.guard";
import { ListSaleComponent } from "./list-sale/list-sale.component";

const routes: Routes = [
  { path: '', component: ListSaleComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }