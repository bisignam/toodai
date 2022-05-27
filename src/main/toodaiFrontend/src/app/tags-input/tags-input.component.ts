import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BookmarkService } from '../bookmark/bookmark.service';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss']
})
export class TagsInputComponent {
  _tags: Set<string> = new Set<string>();
  filteredTags: Observable<string[]>;

  @ViewChild('tagsInput') tagsInput: ElementRef<HTMLInputElement>;
  tagsCtrl = new FormControl();

  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  constructor(private bookmarkService: BookmarkService) {
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      switchMap((tag: string | null) => (tag ? this.getTagsSuggestions(tag) : [])),
    );
  }

  removeTag(tag: string): void {
    const index = this.tags.delete(tag);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.add(event.option.viewValue);
    this.tagsInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  get tags(): Set<string> {
    return this._tags;
  }

  private async getTagsSuggestions(value: string): Promise<string[]> {
    const filterValue = value.toLowerCase();
    return await this.bookmarkService.suggestTags(filterValue);
  }
}