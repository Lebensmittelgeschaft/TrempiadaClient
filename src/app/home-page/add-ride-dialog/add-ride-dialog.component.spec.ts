import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRideDialogComponent } from './add-ride-dialog.component';

describe('AddRideDialogComponent', () => {
  let component: AddRideDialogComponent;
  let fixture: ComponentFixture<AddRideDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRideDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
