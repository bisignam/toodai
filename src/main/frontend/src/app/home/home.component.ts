import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../bookmark/bookmark';
import { BookmarkService } from '../bookmark/bookmark.service';

@Component ({
		selector: 'tod-home',
		styleUrls: [ './home.component.css' ],
		templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {
		bookmarks: Bookmark[];
		constructor(private linkService: BookmarkService, private authService: AuthService) { };
		ngOnInit(): void {
				this.getBookmarks();
		};
		getBookmarks(): void {
				this.linkService.getBookmarks(this.authService.getLoggedUser()).then(bookmarks => this.bookmarks = bookmarks.slice(1, 5));
		};
}
