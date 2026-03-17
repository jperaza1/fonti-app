import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../../_helpers/auth.guard';
import { RouterModule } from '@angular/router';

const routes = [
	{ path: '', redirectTo: 'v1', pathMatch: 'full' },
	{ path: 'v1', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }