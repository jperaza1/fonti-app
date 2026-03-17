import { NgModule } from "@angular/core";
import { AuthGuard } from "../../../../_helpers/auth.guard";
import { ListSideItemComponent } from "./list-side-item/list-side-item.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', component: ListSideItemComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideItemRoutingModule { }