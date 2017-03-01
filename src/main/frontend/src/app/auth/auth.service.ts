import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

	private jwtHelper: JwtHelper = new JwtHelper();

	constructor(private http: Http, private router: Router) { }

	login(username: string, password: string) {
		const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		const body: string = 'username=' + username + '&password=' + password;
		return this.http
			.post('/login', body, { headers: headers }).map(res => {
				const jwt = res.json();
				if (jwt.token) {
					localStorage.setItem('token', jwt.token);
				}
			}).catch(res => { // we need catch because map is not called in case of failure
					return Observable.throw(res.json());
			});
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}

	loggedIn() {
		return tokenNotExpired('token');
	}

	getLoggedUser(): string {
		return this.jwtHelper.decodeToken(localStorage.getItem('token')).sub;
	}

}
