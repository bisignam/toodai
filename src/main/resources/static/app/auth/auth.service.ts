import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

	constructor(private http: Http, private router: Router) { }

	login(username: string, password: string) {
		let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
		let body: string = 'username=' + username + '&password=' + password;
		return this.http
			.post('/login', body, { headers: headers }).map(res => {
				let jwt = res.json();
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

}
