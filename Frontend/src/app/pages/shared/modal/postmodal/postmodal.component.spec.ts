import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmodalComponent } from './postmodal.component';

describe('PostmodalComponent', () => {
  let component: PostmodalComponent;
  let fixture: ComponentFixture<PostmodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostmodalComponent]
    });
    fixture = TestBed.createComponent(PostmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
