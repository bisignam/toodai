import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookmarkFormComponent } from './add-bookmark-form.component';

describe('AddBookmarkFormComponent', () => {
  let component: AddBookmarkFormComponent;
  let fixture: ComponentFixture<AddBookmarkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookmarkFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookmarkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
