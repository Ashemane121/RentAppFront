import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RentalService } from 'src/app/service/rental/rental.service';
import { AdminUserInfoComponent } from '../admin-user-info/admin-user-info.component';
import { AdminPostInfoComponent } from '../admin-post-info/admin-post-info.component';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.css']
})
export class AdminRequestsComponent implements OnInit{
  displayedColumns = ['id_request','user','post','payment','start_date','end_date', 'status','actions'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(
    private rentalService: RentalService,
    private modalService: NgbModal
  ) {}

  requests: any[] = [];

  ngOnInit() {
    this.rentalService.GetAllRequests(sessionStorage.getItem('token'))
    .subscribe((response:any) =>{
      this.requests=response

      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    })
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  approveRequest(id:any) {
    let request = {
      status:''
    }
    //Get the request
    this.rentalService.GetRequestById(id, sessionStorage.getItem('token'))
    .subscribe((response:any) => {
      request=response
      //Update request status to approuved
      request.status='Approuved'
      this.rentalService.UpdateRequest(id, request, sessionStorage.getItem('token'))
      .subscribe(response => {
        //create rental
        let rental = {
          status:'In Progress'
        }
        this.rentalService.AddRental(id, rental, sessionStorage.getItem('token')).subscribe(response => {location.reload()})
      })
    })
  }
  rejectRequest(id:any) {
    let request = {
      status:''
    }
    //Get the request
    this.rentalService.GetRequestById(id, sessionStorage.getItem('token'))
    .subscribe((response:any) => {
      request=response
      //Update request status to approuved
      request.status='Rejected'
      this.rentalService.UpdateRequest(id, request, sessionStorage.getItem('token'))
      .subscribe(response => {
        location.reload()
      })
    })

  }

  openPost(id: any) {
    const modalRef = this.modalService.open(AdminPostInfoComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
  }
  openUser(email: any) {
    const modalRef = this.modalService.open(AdminUserInfoComponent, { size: 'lg' });
    modalRef.componentInstance.email = email;
  }

}
