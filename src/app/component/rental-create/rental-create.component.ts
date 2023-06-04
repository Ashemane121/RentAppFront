import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/service/post/post.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RentalService } from 'src/app/service/rental/rental.service';
import { ToastrService } from 'ngx-toastr'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit{
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private rentalService: RentalService,
    private toastr: ToastrService,
    private activeModal:NgbActiveModal,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter
  ) {

    this.isMarkedDisabled = (date: NgbDate) => {
      const today = new Date();
      const selectedDate = new Date(date.year, date.month - 1, date.day);
      const startDate = new Date(this.currentPost.start_date);
      const endDate = new Date(this.currentPost.end_date);
  
      // Disable dates before today, before the start date, or after the end date
      if (selectedDate <= today || selectedDate < startDate || selectedDate > endDate) {
        return true;
      }
      // Disable dates included in rentedDates      
      const dateString = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
      for (const rentedDate of this.rentedDates) {
        const start = new Date(rentedDate.start)
        start.setHours(0, 0, 0, 0)
        const end = new Date(rentedDate.end)
        end.setHours(0, 0, 0, 0)
        if (selectedDate >= start && selectedDate <= end) {
          return true;
        }
      }
      if (this.fromDate) {
        // Disable all dates before fromDate or after fromDate + 10 days
        const fromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
        const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 10);
        if (selectedDate < fromDate || selectedDate > toDate) {
          return true
        }
        // Disable all dates that are rented after the selected date
        if (this.rentedDates.length>0) {
          for (const rentedDate of this.rentedDates) {
            const start = new Date(rentedDate.start)
            start.setHours(0, 0, 0, 0)
            const end = new Date(rentedDate.end)
            end.setHours(0, 0, 0, 0)
            if (selectedDate > end && selectedDate > fromDate && end > fromDate) {
              return true
            }
          }
        }
        
      }

      return false;
    };

    
  }

  @Input() postId: number=0;
  
  isLoggedIn=false
  isOwned=false
  hoveredDate: NgbDate | null = null
	fromDate: any
	toDate: any
  isMarkedDisabled:any
  rentedDates: any[] = []
  currentPost: any
  cost=0

  ngOnInit() {
    this.postService.GetPostById(this.postId).subscribe((response:any) => {
      this.currentPost=response
      //get post rental dates
      this.rentalService.GetRentalsByPostId(this.currentPost.id_post)
      .subscribe((response:any) => {
        response.forEach((post:any) => {
          const rent = {
            start:post.request.start_date,
            end:post.request.end_date
          }
          this.rentedDates.push(rent)
        })
      })
      
    });
    
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date
    } else {
      this.toDate = null
      this.fromDate = date
    }
    this.updateCost()
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
  isDisabled(date: NgbDate) {
    const today = new Date();
    const selectedDate = new Date(date.year, date.month - 1, date.day);
    const start_date = new Date(this.currentPost.start_date);
    const end_date = new Date(this.currentPost.end_date);
    if (this.fromDate && !this.toDate) {
      // Disable all dates before fromDate or after fromDate + 10 days
      // Disable all dates before fromDate or after fromDate + 10 days
      const fromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
      const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 10);
      if (selectedDate < fromDate || selectedDate > toDate) {
        return true
      }
      // Disable all dates that are rented after the selected date
      if (this.rentedDates.length>0) {
        for (const rentedDate of this.rentedDates) {
          const start = new Date(rentedDate.start)
          start.setHours(0, 0, 0, 0)
          const end = new Date(rentedDate.end)
          end.setHours(0, 0, 0, 0)
          if (selectedDate > end && selectedDate > fromDate && end > fromDate) {
            return true
          }
        }
      }
    }
    return selectedDate < today || selectedDate < start_date || selectedDate > end_date;
  }
  
  isRent (date: NgbDate) {
    const dateString = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
    for (let i = 0; i < this.rentedDates.length; i++) {
      const start = this.rentedDates[i].start;
      const end = this.rentedDates[i].end;
      if (dateString >= start && dateString <= end) {
        return true;
      }
    }
    return false;  
  }
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input)
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue
  }
  refreshDates() {
    this.fromDate=null
	  this.toDate=null
    this.updateCost()
  }
  updateCost(){
    if (this.fromDate && this.toDate) {
      //get total cost
      const startDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day)
      const endDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day)
      const millisecondsPerDay = 24 * 60 * 60 * 1000
      const timeDifference = endDate.getTime() - startDate.getTime()
      this.cost = this.currentPost.price * (Math.round(timeDifference / millisecondsPerDay) + 1)
    } else {
      this.cost = 0
    }
  }

  AddRequest() {
    if (this.authService.IsLoggedIn()) {
      const fromDateInputElement: HTMLInputElement = document.getElementById('fromDate') as HTMLInputElement;
      const fromDateValue: string = fromDateInputElement.value;
      const toDateInputElement: HTMLInputElement = document.getElementById('toDate') as HTMLInputElement;
      const toDateValue: string = toDateInputElement.value;
      const selectedPaymentMethod: HTMLInputElement = document.querySelector('input[name="payment_method"]:checked') as HTMLInputElement;
      const paymentMethodValue: string = selectedPaymentMethod.value;

      if (fromDateValue && toDateValue && paymentMethodValue) {
        const requestValues = {
          payment_method: paymentMethodValue,
          start_date: fromDateValue,
          end_date: toDateValue,
          status: 'Pending'
        }
        
        this.rentalService.AddRequest(sessionStorage.getItem('userId'),this.postId,requestValues, sessionStorage.getItem('token'))
        .subscribe((response:any) => {
          this.toastr.success('Demande de location envoyé')
          this.closeModal()
        });
      } else {
        this.toastr.warning('Veuillez entrer des informations valides')
      }
    } else {
      this.toastr.error('Veuillez vous connecter')
    }
  }

  closeModal() {
    this.activeModal.close();
  }
  

}
