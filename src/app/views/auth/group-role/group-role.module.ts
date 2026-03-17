import { NgModule } from "@angular/core";
import { SharedModule } from '../../shared/shared.module';
import { GroupRoleRoutingModule } from './group-role.routing';
import { ListGroupRoleComponent } from './list-group-role/list-group-role.component';
import { CreateOrUpdateGroupRoleComponent } from './create-or-update-group-role/create-or-update-group-role.component';

@NgModule({
    imports: [
        SharedModule,
        GroupRoleRoutingModule
    ],
    declarations: [ListGroupRoleComponent, CreateOrUpdateGroupRoleComponent],
    providers: [],
    exports: []
})
export class GroupRoleModule { }