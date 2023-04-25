import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOtpChangePasswordComponent } from './check-otp-change-password.component';

describe('CheckOtpChangePasswordComponent', () => {
  let component: CheckOtpChangePasswordComponent;
  let fixture: ComponentFixture<CheckOtpChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOtpChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOtpChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
