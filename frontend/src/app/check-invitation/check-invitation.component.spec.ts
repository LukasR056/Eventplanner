import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInvitationComponent } from './check-invitation.component';

describe('CheckInvitationComponent', () => {
  let component: CheckInvitationComponent;
  let fixture: ComponentFixture<CheckInvitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInvitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
