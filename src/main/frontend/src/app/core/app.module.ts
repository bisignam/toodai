import { ErrorComponent } from './../error/error.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, JsonpModule, RequestOptions } from '@angular/http';

import { BookmarkDetailComponent } from '../bookmark/detail/bookmark-detail.component';
import { AppComponent } from './app.component';
import { BookmarksComponent } from '../bookmark/bookmarks.component';
import { HomeComponent } from '../home/home.component';
import { BookmarkService } from '../bookmark/bookmark.service';
import { BookmarkSearchComponent } from '../bookmark/search/bookmark-search.component';
import { LoginComponent } from '../login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from '../guards/auth.guard';
import { NotAuthGuard } from '../guards/not-auth.guard';
import { AuthService } from '../auth/auth.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
	return new AuthHttp(new AuthConfig({
		tokenName: 'token',
		tokenGetter: (() => localStorage.getItem('token')),
	}), http, options);
}

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpModule,
		JsonpModule
	],
	declarations: [
		AppComponent,
		BookmarksComponent,
		HomeComponent,
		BookmarkDetailComponent,
		BookmarkSearchComponent,
		LoginComponent,
		ErrorComponent
	],
	providers: [
		BookmarkService,
		AuthGuard,
		NotAuthGuard,
		AuthService,
		{
			provide: AuthHttp,
			useFactory: authHttpServiceFactory,
			deps: [Http, RequestOptions]
		}
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
