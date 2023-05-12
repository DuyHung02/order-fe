import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderUserComponent } from './detail-order-user.component';

describe('DetailOrderUserComponent', () => {
  let component: DetailOrderUserComponent;
  let fixture: ComponentFixture<DetailOrderUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailOrderUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailOrderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
