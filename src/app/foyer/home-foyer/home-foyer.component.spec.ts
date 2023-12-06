import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFoyerComponent } from './home-foyer.component';

describe('HomeFoyerComponent', () => {
  let component: HomeFoyerComponent;
  let fixture: ComponentFixture<HomeFoyerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFoyerComponent]
    });
    fixture = TestBed.createComponent(HomeFoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
