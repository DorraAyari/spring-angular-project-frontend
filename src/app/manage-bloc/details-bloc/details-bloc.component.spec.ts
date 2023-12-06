import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBlocComponent } from './details-bloc.component';

describe('DetailsBlocComponent', () => {
  let component: DetailsBlocComponent;
  let fixture: ComponentFixture<DetailsBlocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsBlocComponent]
    });
    fixture = TestBed.createComponent(DetailsBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
