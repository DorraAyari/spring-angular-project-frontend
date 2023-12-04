import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambreModificationComponent } from './chambre-modification.component';

describe('ChambreModificationComponent', () => {
  let component: ChambreModificationComponent;
  let fixture: ComponentFixture<ChambreModificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChambreModificationComponent]
    });
    fixture = TestBed.createComponent(ChambreModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
