import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumentryListComponent } from './forumentry-list.component';

describe('ForumentryListComponent', () => {
  let component: ForumentryListComponent;
  let fixture: ComponentFixture<ForumentryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForumentryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumentryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
