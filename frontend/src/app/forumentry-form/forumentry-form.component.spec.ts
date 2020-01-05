import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumentryFormComponent } from './forumentry-form.component';

describe('ForumentryFormComponent', () => {
  let component: ForumentryFormComponent;
  let fixture: ComponentFixture<ForumentryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumentryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumentryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
