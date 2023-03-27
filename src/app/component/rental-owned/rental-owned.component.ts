import { Component, OnInit } from '@angular/core'
import { RentalService } from 'src/app/service/rental/rental.service'

@Component({
  selector: 'app-rental-owned',
  templateUrl: './rental-owned.component.html',
  styleUrls: ['./rental-owned.component.css']
})
export class RentalOwnedComponent implements OnInit {
  constructor(private rentalService: RentalService) { }
  myRequests: any[] = []
  myPendingRequests: any[] = []
  myApprouvedRequests: any[] = []

  ngOnInit() {
    this.rentalService.GetRequestsByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token'))
    .subscribe(response => {
      this.myRequests = response
      this.myRequests.forEach(request => {
        //get the post requested
        this.rentalService.GetPostById(request.id_request, sessionStorage.getItem('token')).subscribe(response => {
          request.post = response
        })
        //pending requests
        if (request.status==='Pending') {
          this.myPendingRequests.push(request)
        }
        //approved requests
        if (request.status==='Approuved') {
          //fetch rental
          this.rentalService.GetRentalsByRequestId(request.id_request, sessionStorage.getItem('token')).subscribe(response => {
            request.rental=response
          })
          this.myApprouvedRequests.push(request)
        }
      })
    })    
  }

  

}
