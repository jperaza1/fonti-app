

import { NgModule } from "@angular/core";
import { SharedModule } from '../../shared/shared.module';
import { TypeGroupRoutingModule } from './typegroup.routing';
import { ListTypeGroupComponent } from './list-typegroup/list-typegroup.component';
import { CreateOrUpdateTypeGroupComponent } from './create-or-update-typegroup/create-or-update-typegroup.component';

@NgModule({
    imports: [
        SharedModule,
        TypeGroupRoutingModule
    ],
    declarations: [ListTypeGroupComponent, CreateOrUpdateTypeGroupComponent],
    providers: [],
    exports: []
})
export class TypeGroupModule { }
