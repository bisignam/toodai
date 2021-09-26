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
  currentPage: number = 1;
  itemsPerPage = 20;
  totalItems: number;
  public responsive: boolean = true;
  public previousLabel: string = '';
  public nextLabel: string = '';

  ngOnInit(): void {
    this.getBookmarks(this.currentPage, this.itemsPerPage);
  }
  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private authService: AuthService
  ) {
    this.bookmarks = [];
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
}
