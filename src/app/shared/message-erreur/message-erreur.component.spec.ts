import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageErreurComponent } from './message-erreur.component';

describe('MessageErreurComponent', () => {
  let component: MessageErreurComponent;
  let fixture: ComponentFixture<MessageErreurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageErreurComponent]
    });
    fixture = TestBed.createComponent(MessageErreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
