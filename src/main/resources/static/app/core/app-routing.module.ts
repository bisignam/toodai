import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LinksComponent } from '../link/links.component';
import { LinkDetailComponent } from '../link/detail/link-detail.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { NotAuthGuard } from '../guards/not-auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'detail/:id', component: LinkDetailComponent, canActivate: [AuthGuard] },
	{ path: 'links', component: LinksComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
