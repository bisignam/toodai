import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Bookmark } from './bookmark';

@Injectable()
export class BookmarkService {
  private bookmarApiUrl = '/api/bookmarks/myBookmarks';
  constructor(private http: HttpClient) {}
  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  getBookmarks(page: number, pageSize: number): Promise<Bookmark[]> {
    const params: HttpParams = new HttpParams();
    params.set('page', page.toString());
    params.set('pageSize', pageSize.toString());
    return this.http
      .get(this.bookmarApiUrl, { params: params })
      .toPromise()
      .then((response: any) => {
        return response.content as Bookmark[];
      })
      .catch(this.handleError);
  }
}
