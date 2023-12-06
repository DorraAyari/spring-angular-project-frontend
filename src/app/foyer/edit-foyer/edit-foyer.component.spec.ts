import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFoyerComponent } from './edit-foyer.component';

describe('EditFoyerComponent', () => {
  let component: EditFoyerComponent;
  let fixture: ComponentFixture<EditFoyerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFoyerComponent]
    });
    fixture = TestBed.createComponent(EditFoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
