import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTextInputComponent } from './search-text-input.component';
describe('SearchTextInputComponent', () => {
  let component: SearchTextInputComponent;
  let fixture: ComponentFixture<SearchTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTextInputComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
