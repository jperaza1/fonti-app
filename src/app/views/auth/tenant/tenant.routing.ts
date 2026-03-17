import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListTenantComponent } from './list-tenant/list-tenant.component';
import { ProfileTenantComponent } from './profile-tenant/profile-tenant.component';

const routes = [
    { path: '', component: ListTenantComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: 'profile', component: ProfileTenantComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TenantRoutingModule { }