import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  jwthelper = new JwtHelperService();

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http
      .post('/users/signin', headers, {
        params: new HttpParams({
          fromObject: { username: username, password: password },
        }),
        responseType: 'text',
      })
      .pipe(
        map((token: string) => {
          if (token) {
            localStorage.setItem('token', token);
          }
        })
        // catchError((res: any) => {
        //   // we need catch because map is not called in case of failure
        //   //return Observable.throw(res);
        // })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  loggedIn(): boolean {
    let token = localStorage.getItem('token') || undefined;
    if (token) {
      return !this.jwthelper.isTokenExpired(token);
    }
    return false;
  }

  getLoggedUser(): string {
    let token = localStorage.getItem('token') || undefined;
    if (token) {
      return this.jwthelper.decodeToken(token).sub;
    }
    return '';
  }
}
