import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { FormGroup} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CalendarModule, 
    FormsModule, 
    ReactiveFormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  @Input() guestReservation!: FormGroup;
  @Input() calendar_Error!: boolean;
  @ViewChild('calendar') calendar: Calendar | undefined;

  minDate: Date | undefined;
  maxDate: Date | undefined;
  today: Date = new Date();
  isClicked: boolean = false;

  responsiveOptions = [
    {
        breakpoint: '1024px', // For devices larger than 1024px
        numMonths: 2           // Show 2 months
    },
    {
        breakpoint: '1150px',  // For devices between 768px and 1024px
        numMonths: 1           // Show 1 month
    }
  ];

  ngOnInit(){
    const today = new Date();
    this.minDate = new Date(today);
    this.guestReservation.patchValue({
      //set the default range to current date and 3 future days.
      rangeDates: [this.minDate, new Date(today.setDate(today.getDate() + 3))]
    });
  }

  onRangeDateSelect(value: Date){
    const selectedDate = new Date(value);

    const rangeDates = this.guestReservation.get('rangeDates')?.value;
    if(rangeDates[0]?.getTime() == rangeDates[1]?.getTime()){
      this.guestReservation.patchValue({ rangeDates: [rangeDates[0], null] });
    }
    if(rangeDates[0] && !rangeDates[1]){
      // this.minDate = selectedDate;
      const maxRange = new Date(selectedDate);
      maxRange.setDate(maxRange.getDate() + 14);
      this.maxDate = maxRange;
    }
  }

  todayClicked(value: Date){
    const selectedDate = new Date(value);
    console.log(selectedDate);
    this.onRangeDateSelect(selectedDate);
  }

  handleClearSelection(event: Event){
    this.guestReservation.patchValue({ rangeDates: null });
    this.minDate = new Date(this.today);
    this.maxDate = undefined;
    if (this.calendar) {
      this.calendar.overlayVisible = true; // Ensure the overlay remains visible
    }
  }

  get Dates(){
    return this.guestReservation.controls['rangeDates'];
  }
  
}