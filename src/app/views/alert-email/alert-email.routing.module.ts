import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../../_helpers/auth.guard";
import { ListAlertEmailComponent } from "./list-alert-email/list-alert-email.component";

const routes: Routes = [
    { path: '', component: ListAlertEmailComponent, canActivate: [AuthGuard], pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AlertEmailRoutingModule { }