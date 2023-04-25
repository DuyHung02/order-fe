import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMailChangePasswordComponent } from './check-mail-change-password.component';

describe('CheckMailChangePasswordComponent', () => {
  let component: CheckMailChangePasswordComponent;
  let fixture: ComponentFixture<CheckMailChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckMailChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckMailChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
