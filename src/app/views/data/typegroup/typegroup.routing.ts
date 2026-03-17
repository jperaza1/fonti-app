import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListTypeGroupComponent } from './list-typegroup/list-typegroup.component';

const routes = [
    { path: '', component: ListTypeGroupComponent, canActivate: [AuthGuard], pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TypeGroupRoutingModule { }
