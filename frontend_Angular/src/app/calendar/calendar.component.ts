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
        breakpoint: '965px',  // For devices between 768px and 1024px
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

  onRangeDateSelect(){
    const rangeDates = this.guestReservation.get('rangeDates')?.value;
  
    if(rangeDates && rangeDates.length > 0){
      if(rangeDates[0]?.getTime() === rangeDates[1]?.getTime()){
        const nextDay = new Date(rangeDates[0]);
        nextDay.setDate(nextDay.getDate() + 1);
        rangeDates[1] = nextDay;
        this.guestReservation.patchValue({ rangeDates });
      }
      setTimeout(() =>{ // set time out because onRangeDate runs before todayclicked()
        if(this.isClicked){
          rangeDates[0] = this.today;
          this.minDate = new Date(this.today);
          const updatedMaxDate = new Date(rangeDates[0]);
          updatedMaxDate.setDate(updatedMaxDate.getDate() + 31);
          this.maxDate = updatedMaxDate;
          this.guestReservation.patchValue({ rangeDates });
          this.isClicked = false;
        } else {
          this.minDate = new Date(rangeDates[0]);
          const updatedMaxDate = new Date(rangeDates[0]);
          updatedMaxDate.setDate(updatedMaxDate.getDate() + 31);
          this.maxDate = updatedMaxDate;
          this.guestReservation.patchValue({ rangeDates });

        }
        }, 0);
      // else{
      //   console.log("SELECT: ",this.minDate);
      //   console.log("SELECT: ", this.guestReservation.get('rangeDates')?.value);
      //   const updatedMaxDate = new Date(rangeDates[0]);
      //   updatedMaxDate.setDate(updatedMaxDate.getDate() + 31);
      //   this.maxDate = updatedMaxDate;
      // }
    }

  }

  todayClicked(){
    this.isClicked = true;
    this.minDate = new Date(this.today);
    this.guestReservation.patchValue({
      rangeDates: [this.today]
    })
    this.onRangeDateSelect();
    console.log("Clicked Today:", this.minDate);
  }

  handleClearSelection(event: Event){
    this.guestReservation.patchValue({ rangeDates: null });
    this.minDate = new Date(this.today);
    if (this.calendar) {
      this.calendar.overlayVisible = true; // Ensure the overlay remains visible
    }
  }

  get Dates(){
    return this.guestReservation.controls['rangeDates'];
  }
  
}