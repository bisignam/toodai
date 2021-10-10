import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Bookmark } from '../bookmark';

export function createUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let validUrl = true;
    let url;

    //Check browser support for the URL API
    try {
      url = new URL(control.value);
    } catch {
      validUrl = false;
    }

    validUrl = !!(url && ['', 'http:', 'https:'].includes(url.protocol));

    return validUrl ? null : { invalidUrl: true };
  };
}

@Component({
  selector: 'add-bookmark-form',
  templateUrl: './add-bookmark-form.component.html',
  styleUrls: ['./add-bookmark-form.component.scss'],
})
export class AddBookmarkFormComponent implements OnInit {
  bookmarkForm: FormGroup;
  tags: string[] = [];

  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.bookmarkForm = this.formBuilder.group({
      url: ['', [Validators.required, createUrlValidator()]],
      description: ['', [Validators.maxLength(5000)]],
      toRead: [true],
    });
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.input.value = '';
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  public createBookmark(): Bookmark | null {
    if (!this.bookmarkForm.valid) {
      return null;
    }
    let bookmark = new Bookmark();
    bookmark.creationDateTime = new Date().toISOString();
    bookmark.url = this.bookmarkForm.controls.url.value;
    bookmark.description = this.bookmarkForm.controls.description.value;
    bookmark.tags = this.tags;
    bookmark.toRead = this.bookmarkForm.controls.toRead.value;
    return bookmark;
  }

  public getFormGroup(): FormGroup {
    return this.bookmarkForm;
  }

  public checkError(controlName: string, errorName: string): boolean {
    return this.bookmarkForm.controls[controlName].hasError(errorName);
  }
}
