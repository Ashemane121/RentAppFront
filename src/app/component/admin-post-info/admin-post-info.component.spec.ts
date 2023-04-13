import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostInfoComponent } from './admin-post-info.component';

describe('AdminPostInfoComponent', () => {
  let component: AdminPostInfoComponent;
  let fixture: ComponentFixture<AdminPostInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPostInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPostInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
