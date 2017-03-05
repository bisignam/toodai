import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class NotAuthGuard implements CanActivate {
	constructor(private router: Router, private authService: AuthService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (!this.authService.loggedIn()) {
			return true;
		}
		this.router.navigate(['/bookmarks']);
		return false;
	}

}
