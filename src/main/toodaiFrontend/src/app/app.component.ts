import { Component, HostListener, Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {
  faHouseUser as faHouse,
  faUser as faUser,
  faSignOutAlt as faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddBookmarkDialogComponent } from './bookmark/add-bookmark-dialog/add-bookmark-dialog.component';
import { BookmarkService } from './bookmark/bookmark.service';
import { Bookmark } from './bookmark/bookmark';
import { TagsInputComponent } from './tags-input/tags-input.component';

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
    private utilitiesService: UtilitiesService,
    public dialog: MatDialog,
    public bookmarkService: BookmarkService
  ) { }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.utilitiesService.documentClickedTarget.next(event.target);
  }

  public addBookmark() {
    const modalRef = this.dialog.open(AddBookmarkDialogComponent);
    modalRef.afterClosed().subscribe((result: any) => {
      if (result instanceof Bookmark) {
        let bookmark = result as Bookmark;
        this.bookmarkService.createBookmark(bookmark);
      }
    });
  }
}

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  documentClickedTarget: Subject<HTMLElement> = new Subject<HTMLElement>();
}
