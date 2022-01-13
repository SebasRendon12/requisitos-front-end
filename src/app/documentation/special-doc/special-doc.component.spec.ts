import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDocComponent } from './special-doc.component';

describe('SpecialDocComponent', () => {
  let component: SpecialDocComponent;
  let fixture: ComponentFixture<SpecialDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
