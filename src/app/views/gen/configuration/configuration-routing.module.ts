import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helpers/auth.guard';
import { ListConfigurationComponent } from './list-configuration/list-configuration.component';
import { DefaultUserTaskComponent } from './default-user-task/default-user-task.component';


const routes: Routes = [
  { path: '', component: ListConfigurationComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'default-user-task', component: DefaultUserTaskComponent, canActivate: [AuthGuard], pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
