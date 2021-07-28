import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectbidsComponent } from './projectbids.component';

describe('ProjectbidsComponent', () => {
  let component: ProjectbidsComponent;
  let fixture: ComponentFixture<ProjectbidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectbidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectbidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
