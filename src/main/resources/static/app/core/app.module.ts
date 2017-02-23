import { ErrorComponent } from './../error/error.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, JsonpModule, RequestOptions } from '@angular/http';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from '../in-memory-data/in-memory-data.service'; 

import { LinkDetailComponent } from '../link/detail/link-detail.component';
import { AppComponent } from './app.component';
import { LinksComponent } from '../link/links.component';
import { HomeComponent } from '../home/home.component';
import { LinkService } from '../link/link.service';
import { LinkSearchComponent } from '../link/search/link-search.component';
import { LoginComponent } from '../login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from '../guards/auth.guard';
import { NotAuthGuard } from '../guards/not-auth.guard';
import { AuthService } from '../auth/auth.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

function authHttpServiceFactory(http: Http, options: RequestOptions) {
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
		// InMemoryWebApiModule.forRoot(InMemoryDataService)
	],
	declarations: [
		AppComponent,
		LinksComponent,
		HomeComponent,
		LinkDetailComponent,
		LinkSearchComponent,
		LoginComponent,
		ErrorComponent
	],
	providers: [
		LinkService,
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
