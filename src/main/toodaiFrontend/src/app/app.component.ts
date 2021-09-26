import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {
  faHouseUser as faHouse,
  faUser as faUser,
  faSignOutAlt as faSignOut,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TOODAi';
  faHouse = faHouse;
  faUser = faUser;
  constructor(public authService: AuthService) {}
}
