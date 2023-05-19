import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingOrderComponent } from './waiting-order.component';

describe('WaitingOrderComponent', () => {
  let component: WaitingOrderComponent;
  let fixture: ComponentFixture<WaitingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
