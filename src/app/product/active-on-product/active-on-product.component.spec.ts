import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveOnProductComponent } from './active-on-product.component';

describe('ActiveOnProductComponent', () => {
  let component: ActiveOnProductComponent;
  let fixture: ComponentFixture<ActiveOnProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveOnProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveOnProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
