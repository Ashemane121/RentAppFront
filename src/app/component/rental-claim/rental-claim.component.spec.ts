import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalClaimComponent } from './rental-claim.component';

describe('RentalClaimComponent', () => {
  let component: RentalClaimComponent;
  let fixture: ComponentFixture<RentalClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
