import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsDocComponent } from './parents-doc.component';

describe('ParentsDocComponent', () => {
  let component: ParentsDocComponent;
  let fixture: ComponentFixture<ParentsDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentsDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
