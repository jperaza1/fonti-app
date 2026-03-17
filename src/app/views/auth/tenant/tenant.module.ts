import { NgModule } from "@angular/core";
import { SharedModule } from '../../shared/shared.module';
import { TenantRoutingModule } from './tenant.routing';
import { CreateOrUpdateTenantComponent } from './create-or-update-tenant/create-or-update-tenant.component';
import { ListTenantComponent } from './list-tenant/list-tenant.component';
import { ProfileTenantComponent } from './profile-tenant/profile-tenant.component';

@NgModule({
    imports: [
        SharedModule,
        TenantRoutingModule,
    ],
    declarations: [CreateOrUpdateTenantComponent, ListTenantComponent, ProfileTenantComponent],
    providers: [],
    exports: []
})
export class TenantModule { }