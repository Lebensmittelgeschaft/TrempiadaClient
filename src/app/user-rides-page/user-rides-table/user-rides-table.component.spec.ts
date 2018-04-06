import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRidesTableComponent } from './user-rides-table.component';

describe('UserRidesTableComponent', () => {
  let component: UserRidesTableComponent;
  let fixture: ComponentFixture<UserRidesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRidesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRidesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
