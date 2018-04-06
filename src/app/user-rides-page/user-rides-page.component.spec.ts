import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRidesPageComponent } from './user-rides-page.component';

describe('UserRidesPageComponent', () => {
  let component: UserRidesPageComponent;
  let fixture: ComponentFixture<UserRidesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRidesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRidesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
