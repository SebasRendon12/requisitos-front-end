import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmittedComponent } from './admitted.component';

describe('AdmittedComponent', () => {
  let component: AdmittedComponent;
  let fixture: ComponentFixture<AdmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmittedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
