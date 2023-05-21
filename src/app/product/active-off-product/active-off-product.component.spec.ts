import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveOffProductComponent } from './active-off-product.component';

describe('ActiveOffProductComponent', () => {
  let component: ActiveOffProductComponent;
  let fixture: ComponentFixture<ActiveOffProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveOffProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveOffProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
