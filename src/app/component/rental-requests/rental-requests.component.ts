import { Component, OnInit } from '@angular/core'
import { RentalService } from 'src/app/service/rental/rental.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { RentalInfoComponent } from '../rental-info/rental-info.component'
import { UploadService } from 'src/app/service/upload/upload.service'

@Component({
  selector: 'app-rental-requests',
  templateUrl: './rental-requests.component.html',
  styleUrls: ['./rental-requests.component.css']
})
export class RentalRequestsComponent implements OnInit {
  constructor(
    private rentalService: RentalService,
    private uploadService: UploadService,
    private modalService: NgbModal
  ) { }
  myRequests: any[] = []

  ngOnInit() {
    this.rentalService.GetRequestsByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token'))
    .subscribe(response => {
      this.myRequests = response
      this.myRequests.forEach(request => {
        //get total cost
        const startDate = new Date(request.start_date);
        const endDate = new Date(request.end_date);
        const millisecondsPerDay = 24 * 60 * 60 * 1000
        const timeDifference = endDate.getTime() - startDate.getTime()
        request.cost = request.post.price * (Math.round(timeDifference / millisecondsPerDay) + 1)

        //get thumbnail
        this.uploadService.GetImageByRef(request.post.images[0])
        .subscribe((response:any)=>{
          const reader = new FileReader();
          reader.readAsDataURL(response);
          reader.onloadend = () => {
            request.imageUrl = reader.result as string; // save the image URL to a property on the post object
          };
        })
      })
      
    })    
  }

  openRental(rentalId: any) {
    const modalRef = this.modalService.open(RentalInfoComponent, { size: 'lg' });
    modalRef.componentInstance.rentalId = rentalId;
  }
 

}
