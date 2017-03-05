import { BookmarkComponent } from './../bookmark/element/bookmark.component';
import { ErrorComponent } from './../error/error.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, JsonpModule, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { BookmarksComponent } from '../bookmark/bookmarks.component';
import { BookmarkService } from '../bookmark/bookmark.service';
import { LoginComponent } from '../login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from '../guards/auth.guard';
import { NotAuthGuard } from '../guards/not-auth.guard';
import { AuthService } from '../auth/auth.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { CollapseModule } from 'ng2-bootstrap/collapse';
import { DropdownModule } from 'ng2-bootstrap/dropdown';

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
		JsonpModule,
		DropdownModule.forRoot(),
		CollapseModule.forRoot()
	],
	declarations: [
		AppComponent,
		BookmarkComponent,
		BookmarksComponent,
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
