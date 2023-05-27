import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private service: AuthService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) { 
    this.isDisabled = (date: NgbDate, current: {month: number}) => {
      const today = new Date();
      const selectedDate = new Date(date.year, date.month - 1, date.day);
    
      if (this.fromDate && !this.toDate) {
        // Disable all dates before fromDate or after fromDate + 10 days
        const fromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
        const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 20);
        return selectedDate < fromDate || selectedDate > toDate;
      }
    
      return selectedDate < today;
    }
  }
  hoveredDate: NgbDate | null = null
	fromDate: any
	toDate: any
	isDisabled: any

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date
    } else {
      this.toDate = null
      this.fromDate = date
    }
  }
  isStart(date: NgbDate): boolean {
    return this.fromDate && date.equals(this.fromDate);
  }

  isEnd(date: NgbDate): boolean {
    return this.toDate && date.equals(this.toDate);
  }
  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    )
  }
  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate)
  }
  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    )
  }
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input)
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue
  }
  

  ngOnInit(): void {
    this.service.refreshComponent$.subscribe(() => {
      console.log('refreshed home')
      // Add the code here that you want to execute when the event is emitted
    });
  }

}
