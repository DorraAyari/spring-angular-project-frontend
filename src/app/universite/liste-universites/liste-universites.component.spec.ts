import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUniversitesComponent } from './liste-universites.component';

describe('ListeUniversitesComponent', () => {
  let component: ListeUniversitesComponent;
  let fixture: ComponentFixture<ListeUniversitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeUniversitesComponent]
    });
    fixture = TestBed.createComponent(ListeUniversitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
