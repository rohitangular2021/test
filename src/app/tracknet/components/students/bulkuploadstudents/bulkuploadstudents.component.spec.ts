import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkuploadstudentsComponent } from './bulkuploadstudents.component';

describe('BulkuploadstudentsComponent', () => {
  let component: BulkuploadstudentsComponent;
  let fixture: ComponentFixture<BulkuploadstudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkuploadstudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkuploadstudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
