import { Component, ElementRef, ViewChild } from '@angular/core';
import { BookmarkService } from '../bookmark/bookmark.service';

@Component({
  selector: 'search-text-input',
  templateUrl: './search-text-input.component.html',
  styleUrls: ['./search-text-input.component.scss']
})
export class SearchTextInputComponent {

  private _searchText = '';

  constructor(private bookmarkService: BookmarkService) {
  }

  get searchText() {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
  }

  searchBookmarks() {
    this.bookmarkService.searchBookmarks(this.searchText, 0, 20); //use the pageSize configured by the user
  }
  clearSearch() {
    this.bookmarkService.searchBookmarks('', 0, 20); //TODO use the pageSize configured by the user
  }
}