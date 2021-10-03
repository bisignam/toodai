import { Bookmark } from './../bookmark';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { BookmarkService } from '../bookmark.service';

import {
  faTrashAlt as faTrashAlt,
  faEdit as faEdit,
  faSleigh,
} from '@fortawesome/free-solid-svg-icons';
import { UtilitiesService } from 'src/app/app.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBookmarkDialogComponent } from '../delete-bookmark-dialog/delete-bookmark-dialog.component';

@Component({
  selector: 'tod-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss'],
})
export class BookmarkComponent {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  public isDescriptionCollapsed = true;
  private faviconApiUrl = '/icon';
  private faviconSize = 200;
  private editMode = false;
  private wasInside = false;
  @Input()
  public bookmark: Bookmark;
  @Output() editModeChange = new EventEmitter<boolean>();
  @ViewChild('bookmarkDomElement', { read: ElementRef, static: false })
  bookmarkDomElement: ElementRef;

  constructor(
    private eRef: ElementRef,
    private bookmarkService: BookmarkService,
    public dialog: MatDialog,
    private utilitiesService: UtilitiesService
  ) {}

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private getDomain(): string {
    const pathArray = this.bookmark.url.split('/');
    return pathArray[0] + '//' + pathArray[2];
  }

  public getFaviconUrl(): String {
    return (
      this.faviconApiUrl +
      '?url=' +
      this.getDomain() +
      '&size=' +
      this.faviconSize
    );
  }

  public deleteBookmark() {
    const modalRef = this.dialog.open(DeleteBookmarkDialogComponent, {
      data: { name: this.bookmark.title },
    });
    modalRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        this.bookmarkService.deleteBookmark(this.bookmark.id);
      }
    });
  }

  public updateBookmark() {
    this.bookmarkService.updateBookmark(this.bookmark);
  }

  public setEditMode(editMode: boolean): void {
    this.bookmark.editMode = editMode;
    if (editMode === true) {
      /*this.utilitiesService.documentClickedTarget.subscribe((target: any) =>
        this.documentClickListener(target)
      );*/
    } else {
      //  this.utilitiesService.documentClickedTarget.unsubscribe();
    }
    this.editModeChange.emit(this.bookmark.editMode);
  }

  public getEditMode(): boolean {
    return this.bookmark.editMode;
  }

  documentClickListener(target: any): void {
    if (this.bookmarkDomElement.nativeElement.contains(target)) {
      //  this.setEditMode(true);
    } else {
      //this.setEditMode(false);
    }
  }
}
