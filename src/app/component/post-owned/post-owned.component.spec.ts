import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOwnedComponent } from './post-owned.component';

describe('PostOwnedComponent', () => {
  let component: PostOwnedComponent;
  let fixture: ComponentFixture<PostOwnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostOwnedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
