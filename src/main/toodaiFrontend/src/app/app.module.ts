import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BookmarkComponent } from './bookmark/element/bookmark.component';
import { FormsModule } from '@angular/forms';

import { BookmarksComponent } from './bookmark/bookmarks.component';
import { BookmarkService } from './bookmark/bookmark.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthService } from './auth/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';

import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ApiInterceptor } from './interceptors/api-interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent,
    BookmarksComponent,
    LoginComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbNavModule,
    FontAwesomeModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['//localhost:8080/api/users/signin'], //We don't want to send the token when logging in
      },
    }),
  ],
  providers: [
    BookmarkService,
    AuthGuard,
    NotAuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
export class AppModule {}
