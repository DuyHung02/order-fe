import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOtpForgotPassComponent } from './check-otp-forgot-pass.component';

describe('CheckOtpForgotPassComponent', () => {
  let component: CheckOtpForgotPassComponent;
  let fixture: ComponentFixture<CheckOtpForgotPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckOtpForgotPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckOtpForgotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
