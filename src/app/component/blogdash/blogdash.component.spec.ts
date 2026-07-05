import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdashComponent } from './blogdash.component';

describe('BlogdashComponent', () => {
  let component: BlogdashComponent;
  let fixture: ComponentFixture<BlogdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogdashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
