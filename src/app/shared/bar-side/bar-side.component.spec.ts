import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarSideComponent } from './bar-side.component';

describe('BarSideComponent', () => {
  let component: BarSideComponent;
  let fixture: ComponentFixture<BarSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarSideComponent]
    });
    fixture = TestBed.createComponent(BarSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
