import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookmarkDialogComponent } from './add-bookmark-dialog.component';

describe('AddBookmarkDialogComponent', () => {
  let component: AddBookmarkDialogComponent;
  let fixture: ComponentFixture<AddBookmarkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookmarkDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookmarkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
