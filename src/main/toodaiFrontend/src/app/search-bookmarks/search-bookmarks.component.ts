import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BookmarkService } from '../bookmark/bookmark.service';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'search-bookmarks',
  templateUrl: './search-bookmarks.component.html',
  styleUrls: ['./search-bookmarks.component.scss']
})
export class SearchBookmarksComponent {

}