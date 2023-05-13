import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIdentitiesComponent } from './admin-identities.component';

describe('AdminIdentitiesComponent', () => {
  let component: AdminIdentitiesComponent;
  let fixture: ComponentFixture<AdminIdentitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIdentitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminIdentitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
