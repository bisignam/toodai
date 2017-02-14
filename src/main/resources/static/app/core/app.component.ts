import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})

export class AppComponent {
	title = 'Toodai';
	constructor(private authService: AuthService) { }
}
