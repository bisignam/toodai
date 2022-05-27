import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BookmarkService } from '../bookmark/bookmark.service';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'search-text-input',
  templateUrl: './search-text-input.component.html',
  styleUrls: ['./search-text-input.component.scss']
})
export class SearchTextInputComponent {

}