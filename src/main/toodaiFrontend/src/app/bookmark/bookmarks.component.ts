import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bookmark } from './bookmark';
import { BookmarkService } from './bookmark.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tod-bookmarks',
  templateUrl: './bookmarks.component.html',
})
export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[];
  currentPage: number = 1;
  itemsPerPage = 20;
  totalItems: number;
  public responsive: boolean = true;
  public previousLabel: string = '';
  public nextLabel: string = '';
  private bookmarksSubscription: Subscription;

  ngOnInit(): void {
    this.getBookmarks(this.currentPage, this.itemsPerPage);
  }
  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private authService: AuthService
  ) {
    this.bookmarks = [];
    this.bookmarksSubscription = this.bookmarkService.getUpdatedBookmarks().subscribe
      (bookmarksPromise => {
        bookmarksPromise.then((updatedBookmarksResponse) => {
          this.bookmarks = updatedBookmarksResponse.content as Bookmark[];
          this.totalItems = updatedBookmarksResponse.totalElements;
        });
      });
  }
  getBookmarks(page: number, pageSize: number): void {
    this.currentPage = page;
    this.bookmarkService
      .getBookmarks(
        page - 1 /*this is needed because ngx-pagination starts from 1 */,
        pageSize
      )
      .then((response) => {
        this.bookmarks = response.content as Bookmark[];
        this.totalItems = response.totalElements;
      });
  }
  public setEditModeFalseExceptFor(bookmarkId: number): void {
    this.bookmarks
      .filter((b) => b.id !== bookmarkId)
      .map((b) => (b.editMode = false));
  }
  ngOnDestroy() { // It's a good practice to unsubscribe to ensure no memory leaks
    this.bookmarksSubscription.unsubscribe();
  }
}
