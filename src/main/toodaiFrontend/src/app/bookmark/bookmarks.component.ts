import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bookmark } from './bookmark';
import { BookmarkService } from './bookmark.service';

@Component({
  selector: 'tod-bookmarks',
  templateUrl: './bookmarks.component.html',
})
export class BookmarksComponent implements OnInit {
  bookmarks: Bookmark[];
  ngOnInit(): void {
    this.getBookmarks(0, 20);
  }
  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private authService: AuthService
  ) {
    this.bookmarks = [];
  }
  getBookmarks(page: number, pageSize: number): void {
    this.bookmarkService
      .getBookmarks(page, pageSize)
      .then((bookmarks) => (this.bookmarks = bookmarks));
  }
}
