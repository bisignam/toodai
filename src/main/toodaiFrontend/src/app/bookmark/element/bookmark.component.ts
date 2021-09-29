import { Bookmark } from './../bookmark';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BookmarkService } from '../bookmark.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  faTrashAlt as faTrashAlt,
  faEdit as faEdit,
  faSleigh,
} from '@fortawesome/free-solid-svg-icons';
import { UtilitiesService } from 'src/app/app.component';

@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Bookmark deletion</h4>
      <button
        type="button"
        class="close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="activeModal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        <strong
          >Are you sure you want to delete bookmark
          <span class="text-primary">{{ name }}</span
          >?</strong
        >
      </p>
      <p>
        All information associated to this bookmark profile will be permanently
        deleted.
        <span class="text-danger">This operation can not be undone.</span>
      </p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        ngbAutofocus
        class="btn btn-outline-secondary"
        (click)="activeModal.dismiss(false)"
      >
        Cancel
      </button>
      <button
        type="button"
        class="btn btn-danger"
        (click)="activeModal.close(true)"
      >
        Ok
      </button>
    </div>
  `,
})
export class NgbdModalContent {
  @Input() name: String;

  constructor(public activeModal: NgbActiveModal) {}
}

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
    public modalService: NgbModal,
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
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.name = this.bookmark.title;
    modalRef.result.then((result: any) => {
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
