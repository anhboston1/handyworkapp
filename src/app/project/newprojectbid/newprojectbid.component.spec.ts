import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewprojectbidComponent } from './newprojectbid.component';

describe('NewprojectbidComponent', () => {
  let component: NewprojectbidComponent;
  let fixture: ComponentFixture<NewprojectbidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewprojectbidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewprojectbidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
