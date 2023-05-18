import { Component, OnInit } from '@angular/core'
import { RentalService } from 'src/app/service/rental/rental.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RentalInfoComponent } from '../rental-info/rental-info.component'
import { RentalClaimComponent } from '../rental-claim/rental-claim.component'

@Component({
  selector: 'app-rental-owned',
  templateUrl: './rental-owned.component.html',
  styleUrls: ['./rental-owned.component.css']
})
export class RentalOwnedComponent implements OnInit {
  constructor(
    private rentalService: RentalService,
    private modalService: NgbModal
  ) { }
  myRentals:any[] =[]

  ngOnInit() {
    this.rentalService.GetRentalsByUserId(sessionStorage.getItem('userId'))
    .subscribe((response:any) => {
      this.myRentals = response
    }) 
  }

  openRental(rentalId: any) {
    const modalRef = this.modalService.open(RentalInfoComponent, { size: 'lg' });
    modalRef.componentInstance.rentalId = rentalId;
  }

  openClaim(rentalId: any) {
    const modalRef = this.modalService.open(RentalClaimComponent, { size: 'md' });
    modalRef.componentInstance.rentalId = rentalId;
  }

  

}
