import { NgModule } from '@angular/core';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ListConfigurationComponent } from './list-configuration/list-configuration.component';
import { CreateOrUpdateConfigurationComponent } from './create-or-update-configuration/create-or-update-configuration.component';
import { SharedModule } from '../../shared/shared.module';
import { DefaultUserTaskComponent } from './default-user-task/default-user-task.component';


@NgModule({
  declarations: [ListConfigurationComponent, CreateOrUpdateConfigurationComponent, DefaultUserTaskComponent],
  imports: [
    SharedModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
