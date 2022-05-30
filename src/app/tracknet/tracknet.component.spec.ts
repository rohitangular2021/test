import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracknetComponent } from './tracknet.component';

describe('TracknetComponent', () => {
  let component: TracknetComponent;
  let fixture: ComponentFixture<TracknetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracknetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracknetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
