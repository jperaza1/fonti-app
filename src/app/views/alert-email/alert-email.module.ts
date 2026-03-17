import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAlertEmailComponent } from './list-alert-email/list-alert-email.component';
import { CreateOrUpdateAlertEmailComponent } from './create-or-update-alert-email/create-or-update-alert-email.component';
import { SharedModule } from '../shared/shared.module';
import { AlertEmailRoutingModule } from './alert-email.routing.module';
import { ClipboardModule } from 'ngx-clipboard';



@NgModule({
    declarations: [ListAlertEmailComponent, CreateOrUpdateAlertEmailComponent],
    imports: [
        CommonModule,
        SharedModule,
        AlertEmailRoutingModule
    ]
})
export class AlertEmailModule { }
