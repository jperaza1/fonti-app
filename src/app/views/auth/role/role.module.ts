import { NgModule } from "@angular/core";
import { SharedModule } from '../../shared/shared.module';
import { RoleRoutingModule } from './role.routing';
import { CreateOrUpdateRoleComponent } from './create-or-update-role/create-or-update-role.component';
import { ListRoleComponent } from './list-role/list-role.component';

@NgModule({
    imports: [
        SharedModule,
        RoleRoutingModule
    ],
    declarations: [CreateOrUpdateRoleComponent, ListRoleComponent],
    providers: [],
    exports: []
})
export class RoleModule { }