import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsUniversiteComponent } from './details-universite.component';

describe('DetailsUniversiteComponent', () => {
  let component: DetailsUniversiteComponent;
  let fixture: ComponentFixture<DetailsUniversiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsUniversiteComponent]
    });
    fixture = TestBed.createComponent(DetailsUniversiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
