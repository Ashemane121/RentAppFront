import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileIdentityComponent } from './user-profile-identity.component';

describe('UserProfileIdentityComponent', () => {
  let component: UserProfileIdentityComponent;
  let fixture: ComponentFixture<UserProfileIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileIdentityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
