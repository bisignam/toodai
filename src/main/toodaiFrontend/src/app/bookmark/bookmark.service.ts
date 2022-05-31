import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { BookmarksResponse } from './BookmarksResponse';
import { Bookmark } from './bookmark';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  private searchText: string = '';
  private bookmarksSubject: Subject<Promise<BookmarksResponse>> = new Subject();
  private baseBookmarksUrl = '/api/bookmarks/';
  private baseBookmarksSearchUrl = `${this.baseBookmarksUrl}search`;
  private mayBookmarksUrl = this.baseBookmarksUrl + 'myBookmarks';

  constructor(private http: HttpClient) { }
  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getBookmarks(page: number, pageSize: number): Promise<BookmarksResponse> {
    if (!this.searchText) {
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
    } else {
      return this.searchBookmarks(this.searchText, page, pageSize);
    }
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
  searchBookmarks(searchText: string, page: number, pageSize: number): Promise<BookmarksResponse> {
    this.searchText = searchText;
    if (searchText) {
      const options = {
        params: new HttpParams()
          .set('search', searchText)
          .set('page', page.toString())
          .set('pageSize', pageSize.toString()),
      };
      const response = this.http
        .get(`${this.baseBookmarksSearchUrl}/bookmarks`, options)
        .toPromise()
        .then((response: any) => {
          return response;
        })
        .catch(this.handleError);
      this.updateBookmarks(response);
      return response;
    } else {
      const response = this.getBookmarks(page, pageSize);
      this.updateBookmarks(this.getBookmarks(page, pageSize));
      return response;
    }
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
  updateBookmarks(bookmarksPromise: Promise<BookmarksResponse>) {
    this.bookmarksSubject.next(bookmarksPromise);
  }
  getUpdatedBookmarks(): Observable<Promise<BookmarksResponse>> {
    return this.bookmarksSubject.asObservable();
  }
  getCurrentSearchText(): string {
    return this.searchText;
  }
}
