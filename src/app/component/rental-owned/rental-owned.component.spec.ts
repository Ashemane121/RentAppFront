import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalOwnedComponent } from './rental-owned.component';

describe('RentalOwnedComponent', () => {
  let component: RentalOwnedComponent;
  let fixture: ComponentFixture<RentalOwnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalOwnedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
