import { Component, OnInit } from '@angular/core'
import { RentalService } from 'src/app/service/rental/rental.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RentalInfoComponent } from '../rental-info/rental-info.component'
import { RentalClaimComponent } from '../rental-claim/rental-claim.component'
import { UploadService } from 'src/app/service/upload/upload.service'

@Component({
  selector: 'app-rental-owned',
  templateUrl: './rental-owned.component.html',
  styleUrls: ['./rental-owned.component.css']
})
export class RentalOwnedComponent implements OnInit {
  constructor(
    private rentalService: RentalService,
    private uploadService: UploadService,
    private modalService: NgbModal
  ) { }
  myRentals:any[] =[]

  ngOnInit() {
    this.rentalService.GetRentalsByUserId(sessionStorage.getItem('userId'))
    .subscribe((response:any) => {
      this.myRentals = response
      this.myRentals.forEach(rental => {
        //get total cost
        const startDate = new Date(rental.request.start_date);
        const endDate = new Date(rental.request.end_date);
        const millisecondsPerDay = 24 * 60 * 60 * 1000
        const timeDifference = endDate.getTime() - startDate.getTime()
        rental.cost = rental.request.post.price * (Math.round(timeDifference / millisecondsPerDay) + 1)

        //update status
        const currentDate = new Date();
        if (currentDate.getTime() > startDate.getTime() && rental.status==='Pending'){
          const finishedRental=rental
          finishedRental.status='In Progress'
          delete finishedRental.id_rental;
          this.rentalService.UpdateRental(rental.id_rental, finishedRental, sessionStorage.getItem('token'))
          .subscribe(response => {
            location.reload()
          })
        }
        if (currentDate.getTime() > endDate.getTime() && rental.status==='In Progress') {
          const finishedRental=rental
          finishedRental.status='Finished'
          delete finishedRental.id_rental;
          this.rentalService.UpdateRental(rental.id_rental, finishedRental, sessionStorage.getItem('token'))
          .subscribe(response => {
            location.reload()
          })
        }

        //get thumbnail
        this.uploadService.GetImageByRef(rental.request.post.images[0])
        .subscribe((response:any)=>{
          const reader = new FileReader();
          reader.readAsDataURL(response);
          reader.onloadend = () => {
            rental.request.imageUrl = reader.result as string; // save the image URL to a property on the post object
          };
        })
      })
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
