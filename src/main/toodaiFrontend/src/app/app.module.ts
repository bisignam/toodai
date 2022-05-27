import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BookmarkComponent } from './bookmark/element/bookmark.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookmarksComponent } from './bookmark/bookmarks.component';
import { BookmarkService } from './bookmark/bookmark.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthService } from './auth/auth.service';
import { NgxPaginationModule } from 'ngx-pagination';

import { ApiInterceptor } from './interceptors/api-interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { DeleteBookmarkDialogComponent } from './bookmark/delete-bookmark-dialog/delete-bookmark-dialog.component';
import { AddBookmarkDialogComponent } from './bookmark/add-bookmark-dialog/add-bookmark-dialog.component';
import { AddBookmarkFormComponent } from './bookmark/add-bookmark-form/add-bookmark-form.component';
import { environment } from '../environments/environment';
import { TagsInputComponent } from './tags-input/tags-input.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent,
    BookmarksComponent,
    LoginComponent,
    DeleteBookmarkDialogComponent,
    AddBookmarkFormComponent,
    AddBookmarkDialogComponent,
    TagsInputComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    MatDialogModule,
    MatExpansionModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.baseUrl],
        disallowedRoutes: ['//localhost:8090/users/signin'], //We don't want to send the token when logging in
      },
    }),
    BrowserAnimationsModule,
  ],
  entryComponents: [DeleteBookmarkDialogComponent, AddBookmarkDialogComponent],
  providers: [
    BookmarkService,
    AuthGuard,
    NotAuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  ],
})
export class AppModule { }
