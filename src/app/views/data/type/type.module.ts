import { NgModule } from "@angular/core";
import { SharedModule } from '../../shared/shared.module';
import { TypeRoutingModule } from './type.routing';
import { CreateOrUpdateTypeComponent } from './create-or-update-type/create-or-update-type.component';
import { ListTypeComponent } from './list-type/list-type.component';

@NgModule({
    imports: [
        SharedModule,
        TypeRoutingModule
    ],
    declarations: [CreateOrUpdateTypeComponent, ListTypeComponent],
    providers: [],
    exports: [CreateOrUpdateTypeComponent]
})
export class TypeModule { }
