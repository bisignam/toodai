import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { URLSearchParams } from '@angular/http';
import { Bookmark } from './bookmark';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookmarkService {
	private bookmarApiUrl = 'api/bookmarks';
	private headers = new Headers({ 'Content-Type': 'application/json' });
	constructor(private http: AuthHttp) { };
	handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
	getBookmarks(username: string): Promise<Bookmark[]> {
		let params: URLSearchParams = new URLSearchParams();
		params.set('user', username);
		return this.http.get(this.bookmarApiUrl, {search: params}).toPromise()
			.then(response => response.json().data as Bookmark[])
			.catch(this.handleError);
	}
	getBookmark(username: string, id: number): Promise<Bookmark> {
		return this.getBookmarks(username)
			.then(links => links.find(link => link.id === id));
	}
	update(link: Bookmark): Promise<Bookmark> {
		const url = `${this.bookmarApiUrl}/${link.id}`;
		return this.http.put(url, JSON.stringify(link), { headers: this.headers })
			.toPromise()
			.then(() => link)
			.catch(this.handleError);
	}
}
