import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service'; // from documentation: Always import the InMemoryWebApiModule after the HttpModule to ensure that the XHRBackend provider of the InMemoryWebApiModule supersedes all others.

import { HeroDetailComponent } from './hero-detail.component';
import { AppComponent }  from './app.component';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from './hero.service';
import { HeroSearchComponent } from './hero-search.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
	BrowserModule,
	FormsModule,
	AppRoutingModule,
	HttpModule,
	InMemoryWebApiModule.forRoot(InMemoryDataService)
    ],
    declarations: [ 
	AppComponent,
	HeroesComponent,
	DashboardComponent,
	HeroDetailComponent,
	HeroSearchComponent
    ],
    providers: [ HeroService ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }
