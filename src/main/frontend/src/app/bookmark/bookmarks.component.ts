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
		this.getBookmarks();
	};
	constructor(
		private bookmarkService: BookmarkService,
		private router: Router,
		private authService: AuthService
	) { };
	getBookmarks(): void {
		this.bookmarkService.getBookmarks(this.authService.getLoggedUser()).then(bookmarks => this.bookmarks = bookmarks);
	};
}
