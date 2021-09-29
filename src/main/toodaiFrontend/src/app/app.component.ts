import { Component, HostListener, Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {
  faHouseUser as faHouse,
  faUser as faUser,
  faSignOutAlt as faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TOODAi';
  faHouse = faHouse;
  faUser = faUser;
  constructor(
    public authService: AuthService,
    private utilitiesService: UtilitiesService
  ) {}

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.utilitiesService.documentClickedTarget.next(event.target);
  }
}

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>();
}
