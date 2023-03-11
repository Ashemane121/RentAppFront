import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlistingComponent } from './postlisting.component';

describe('PostlistingComponent', () => {
  let component: PostlistingComponent;
  let fixture: ComponentFixture<PostlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostlistingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
