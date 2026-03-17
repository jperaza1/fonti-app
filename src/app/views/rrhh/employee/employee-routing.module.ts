import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../../_helpers/auth.guard";
import { ListEmployeeComponent } from "./list-employee/list-employee.component";
import { CreateOrUpdateEmployeeComponent } from "./create-or-update-employee/create-or-update-employee.component";

const routes: Routes = [
  { path: '', component: ListEmployeeComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'create', component: CreateOrUpdateEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: CreateOrUpdateEmployeeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }