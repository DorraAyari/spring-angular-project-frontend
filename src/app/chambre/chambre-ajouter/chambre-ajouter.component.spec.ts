import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChambreAjouterComponent } from './chambre-ajouter.component';

describe('ChambreAjouterComponent', () => {
  let component: ChambreAjouterComponent;
  let fixture: ComponentFixture<ChambreAjouterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChambreAjouterComponent]
    });
    fixture = TestBed.createComponent(ChambreAjouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
