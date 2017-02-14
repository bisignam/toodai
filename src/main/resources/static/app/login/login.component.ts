import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
	moduleId: module.id,
	selector: 'login-component',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent {
	constructor(private router: Router, private authService: AuthService) { };

	login(username: string, password: string) {
		return this.authService.login(username, password).subscribe(
			data => {
				this.router.navigate(['/home']);
			},
			error => {
				console.log(error);
			});
	}

}
