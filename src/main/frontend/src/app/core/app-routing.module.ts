import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { BookmarksComponent } from '../bookmark/bookmarks.component';
import { BookmarkDetailComponent } from '../bookmark/detail/bookmark-detail.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { NotAuthGuard } from '../guards/not-auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'bookmark/:id', component: BookmarkDetailComponent, canActivate: [AuthGuard] },
	{ path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }
