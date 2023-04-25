import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMailForgotPassComponent } from './check-mail-forgot-pass.component';

describe('CheckMailForgotPassComponent', () => {
  let component: CheckMailForgotPassComponent;
  let fixture: ComponentFixture<CheckMailForgotPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckMailForgotPassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckMailForgotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
