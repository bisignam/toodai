import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { BookmarksResponse } from './BookmarksResponse';
import { Bookmark } from './bookmark';

@Injectable()
export class BookmarkService {
  private baseBookmarksUrl = '/bookmarks/';
  private baseBookmarksSearchUrl = `${this.baseBookmarksUrl}search`;
  private mayBookmarksUrl = this.baseBookmarksUrl + 'myBookmarks';
  constructor(private http: HttpClient) { }
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
      .get(this.mayBookmarksUrl, options)
      .toPromise()
      .then((response: any) => {
        return response as BookmarksResponse;
      })
      .catch(this.handleError);
  }
  deleteBookmark(id: number): Promise<Response> {
    return this.http
      .delete(this.baseBookmarksUrl + encodeURIComponent(id))
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch(this.handleError);
  }
  updateBookmark(bookmark: Bookmark): Promise<Response> {
    return this.http
      .put(this.baseBookmarksUrl, bookmark)
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch(this.handleError);
  }
  createBookmark(bookmark: Bookmark): Promise<Response> {
    return this.http
      .post(this.baseBookmarksUrl, bookmark)
      .toPromise()
      .then((response: any) => {
        return response;
      })
      .catch(this.handleError);
  }
  suggestTags(value: string): Promise<string[]> {
    const options = {
      params: new HttpParams()
        .set('tag', value)
    };
    return this.http
      .get(`${this.baseBookmarksSearchUrl}/tagsSuggestions`, options)
      .toPromise()
      .then((response: any) => {
        return response as string[];
      })
      .catch(this.handleError);
  }
}
