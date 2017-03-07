import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'tod-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})

export class LoginComponent {
	private error: string;
	constructor(private router: Router, private authService: AuthService) {};

	login(username: string, password: string) {
		this.clearErrors();
		return this.authService.login(username, password).subscribe(
			data => {
				this.router.navigate(['/bookmarks']);
			},
			error => {
				this.displayErrors(error);
			});
	}

	displayErrors(error: any) {
		if (error.message) {
			this.error = error.message;
		}
	}

	clearErrors() {
		this.error = '';
	}

}
