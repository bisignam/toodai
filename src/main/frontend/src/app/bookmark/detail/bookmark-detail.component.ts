import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Bookmark } from '../bookmark';
import { BookmarkService } from '../bookmark.service';

@Component({
	selector: 'tod-bookmark-detail',
	styleUrls: ['./bookmark-detail.component.css'],
	templateUrl: './bookmark-detail.component.html'
})

export class BookmarkDetailComponent implements OnInit {
	bookmark: Bookmark;
	constructor(
		private bookmarkService: BookmarkService,
		private authService: AuthService,
		private route: ActivatedRoute,
		private location: Location
	) { };
	ngOnInit(): void {
		// tslint:disable-next-line:max-line-length
		this.route.params.switchMap((params: Params) => this.bookmarkService.getBookmark(this.authService.getLoggedUser(), +params['id'])) // + operator convert string to number
			.subscribe(bookmark => this.bookmark = bookmark);
	};
	goBack(): void {
		this.location.back();
	};
	save(): void {
		this.bookmarkService.update(this.bookmark).then(() => this.goBack());
	};
}
