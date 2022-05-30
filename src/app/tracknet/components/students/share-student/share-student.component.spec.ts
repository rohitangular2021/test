import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareStudentComponent } from './share-student.component';

describe('ShareStudentComponent', () => {
  let component: ShareStudentComponent;
  let fixture: ComponentFixture<ShareStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
