import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogboxComponent } from './confirm-dialogbox.component';

describe('ConfirmDialogboxComponent', () => {
  let component: ConfirmDialogboxComponent;
  let fixture: ComponentFixture<ConfirmDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
