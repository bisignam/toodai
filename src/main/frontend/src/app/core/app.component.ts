import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
	// TODO if we use a selector different from app-root the application crashes, investigate.
	// tslint:disable-next-line:component-selector
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.less'],
})

export class AppComponent {
	title = 'TOODAi';
	constructor(private authService: AuthService) { }
}
