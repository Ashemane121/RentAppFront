import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRatingsComponent } from './admin-ratings.component';

describe('AdminRatingsComponent', () => {
  let component: AdminRatingsComponent;
  let fixture: ComponentFixture<AdminRatingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRatingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
