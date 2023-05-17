import { Component, OnInit } from '@angular/core'
import { RentalService } from 'src/app/service/rental/rental.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RentalInfoComponent } from '../rental-info/rental-info.component'

@Component({
  selector: 'app-rental-requests',
  templateUrl: './rental-requests.component.html',
  styleUrls: ['./rental-requests.component.css']
})
export class RentalRequestsComponent implements OnInit {
  constructor(
    private rentalService: RentalService,
    private modalService: NgbModal
  ) { }
  myRequests: any[] = []

  ngOnInit() {
    this.rentalService.GetRequestsByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token'))
    .subscribe(response => {
      this.myRequests = response
    })    
  }

  openRental(rentalId: any) {
    const modalRef = this.modalService.open(RentalInfoComponent, { size: 'lg' });
    modalRef.componentInstance.rentalId = rentalId;
  }

  

}
