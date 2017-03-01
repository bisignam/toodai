import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bookmark } from './bookmark';
import { BookmarkService } from './bookmark.service';


@Component({
	selector: 'tod-bookmarks',
	templateUrl: './bookmarks.component.html',
	styleUrls: ['./bookmarks.component.css']
})

export class BookmarksComponent implements OnInit {
	bookmarks: Bookmark[];
	selectedBookmark: Bookmark;
	ngOnInit(): void {
		this.getBookmarks();
	};
	constructor(
		private bookmarkService: BookmarkService,
		private router: Router,
		private authService: AuthService
	) { };
	onSelect(link: Bookmark): void {
		this.selectedBookmark = link;
	};
	getBookmarks(): void {
		this.bookmarkService.getBookmarks(this.authService.getLoggedUser()).then(bookmarks => this.bookmarks = bookmarks);
	};
	gotoDetail(): void {
		this.router.navigate(['/detail/', this.selectedBookmark.id]);
	};
}
