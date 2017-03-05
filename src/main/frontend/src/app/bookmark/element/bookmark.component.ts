import { Bookmark } from './../bookmark';
import { Component, Input } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

@Component({
	selector: 'tod-bookmark',
	templateUrl: './bookmark.component.html',
	styleUrls: ['./bookmark.component.less']
})

export class BookmarkComponent {
	public isDescriptionCollapsed = true;
	private faviconApiUrl = '/icon';
	private faviconSize = 200;
	@Input()
	public bookmark: Bookmark;

	public constructor(private http: Http) { }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

	private getDomain(): string {
		const pathArray = this.bookmark.url.split('/');
		return pathArray[0] + '//' + pathArray[2];
	}

	public getFaviconUrl(): String {
		return this.faviconApiUrl + '?url=' + this.getDomain() + '&size=' + this.faviconSize;
	}
}

