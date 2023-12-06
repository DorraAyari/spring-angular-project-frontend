import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversitComponent } from './universit.component';

describe('UniversitComponent', () => {
  let component: UniversitComponent;
  let fixture: ComponentFixture<UniversitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversitComponent]
    });
    fixture = TestBed.createComponent(UniversitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
