import { NgModule } from "@angular/core";
import { AuthGuard } from "../../../../_helpers/auth.guard";
import { ListDishComponent } from "./list-dish/list-dish.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', component: ListDishComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule { }