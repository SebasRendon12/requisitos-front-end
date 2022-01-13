import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountDocComponent } from './discount-doc.component';

describe('DiscountDocComponent', () => {
  let component: DiscountDocComponent;
  let fixture: ComponentFixture<DiscountDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
