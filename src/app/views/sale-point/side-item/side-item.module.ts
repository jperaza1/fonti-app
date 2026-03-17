import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListSideItemComponent } from './list-side-item/list-side-item.component';
import { CreateOrUpdateSideItemComponent } from './create-or-update-side-item/create-or-update-side-item.component';
import { SharedModule } from '../../shared/shared.module';
import { SideItemRoutingModule } from './side-item-routing.module';



@NgModule({
  declarations: [ListSideItemComponent, CreateOrUpdateSideItemComponent],
  imports: [
    CommonModule,
    SharedModule,
    SideItemRoutingModule
  ]
})
export class SideItemModule { }
