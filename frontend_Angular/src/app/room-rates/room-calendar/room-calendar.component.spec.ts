import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCalendarComponent } from './room-calendar.component';

describe('RoomCalendarComponent', () => {
  let component: RoomCalendarComponent;
  let fixture: ComponentFixture<RoomCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
