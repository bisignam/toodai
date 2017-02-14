import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

	constructor(private http: Http, private router: Router) { }

	login(username: string, password: string) {
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let body: string = 'username=' + username + '&password=' + password;
		return this.http
			.post('/login', body, { headers: headers }).map(response => {
				let jwt = response.json();
				if (jwt.token) {
					localStorage.setItem('token', jwt.token);
				}
			});
	}

	logout() {
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}

	loggedIn() {
		return tokenNotExpired('token');
	}

}
