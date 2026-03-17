import { NgModule } from "@angular/core";
import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user.routing';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateOrUpdateUserComponent } from './create-or-update-user/create-or-update-user.component';

@NgModule({
    imports: [
        SharedModule,
        UserRoutingModule
    ],
    declarations: [ListUserComponent, CreateOrUpdateUserComponent],
    providers: [],
    exports: []
})
export class UserModule { }