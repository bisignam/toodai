import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

/** @title Form field with label */
@Component({
  selector: 'add-bookmark-form',
  templateUrl: './add-bookmark-form.component.html',
  styleUrls: ['./add-bookmark-form.component.scss'],
})
export class AddBookmarkFormComponent {
  options: FormGroup;
  toRead = new FormControl(true);

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: this.toRead,
    });
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.input.value = '';
    // Clear the input value
    // Doesn't work ??!! Why ? event.input!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
