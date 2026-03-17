import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListRoleComponent } from './list-role/list-role.component';

const routes = [
    { path: '', component: ListRoleComponent, canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleRoutingModule { }