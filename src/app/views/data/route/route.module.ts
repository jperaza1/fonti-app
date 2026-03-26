import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListRouteComponent } from './list-route/list-route.component';
import { CreateOrUpdateRouteComponent } from './create-or-update-route/create-or-update-route.component';
import { SharedModule } from '../../shared/shared.module';
import { RouteRoutingModule } from './route-routing.module';

@NgModule({
  declarations: [ListRouteComponent, CreateOrUpdateRouteComponent],
  imports: [CommonModule, SharedModule, RouteRoutingModule],
})
export class RouteModule {}
