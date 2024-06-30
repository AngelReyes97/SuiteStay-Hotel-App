import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CityComponent } from './city/city.component';
import { GuestSelectorComponent } from './guest-selector/guest-selector.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CalendarModule, 
    FormsModule, 
    CityComponent,
    GuestSelectorComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  rangeDates: Date[] | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  defaultRange: string | undefined;

  ngOnInit(){
    const today = new Date();
    this.minDate = new Date(today);
    this.rangeDates = [today];
    const defaultrange = new Date(today);
    defaultrange.setDate(defaultrange.getDate() + 3);
    this.rangeDates[1] = defaultrange;
  }

  onRangeDateSelect() {   
    if(this.rangeDates && this.rangeDates.length > 0){
      if(this.rangeDates[0]?.getTime() === this.rangeDates[1]?.getTime()){
        const nextDay = new Date(this.rangeDates[0]);
        nextDay.setDate(nextDay.getDate() + 1);
        this.rangeDates[1] = nextDay;
      } else{
      const updatedMaxDate = new Date(this.rangeDates[0]);
      updatedMaxDate.setDate(updatedMaxDate.getDate() + 31);
      this.maxDate = updatedMaxDate;
      }
    }
  }

  todayClicked(){
    this.onRangeDateSelect();
  }

  handleClearSelection(){
    this.rangeDates = undefined;
    this.maxDate = undefined; 
  }
}
