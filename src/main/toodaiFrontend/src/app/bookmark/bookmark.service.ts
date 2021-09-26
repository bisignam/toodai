import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BookmarksResponse } from './BookmarksResponse';

@Injectable()
export class BookmarkService {
  private bookmarApiUrl = '/api/bookmarks/myBookmarks';
  constructor(private http: HttpClient) {}
  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getBookmarks(page: number, pageSize: number): Promise<BookmarksResponse> {
    const options = {
      params: new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString()),
    };
    return this.http
      .get(this.bookmarApiUrl, options)
      .toPromise()
      .then((response: any) => {
        return response as BookmarksResponse;
      })
      .catch(this.handleError);
  }
}
