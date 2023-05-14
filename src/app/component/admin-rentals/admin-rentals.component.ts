import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post/post.service';
import { RentalService } from 'src/app/service/rental/rental.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminPostInfoComponent } from '../admin-post-info/admin-post-info.component';
import { AdminUserInfoComponent } from '../admin-user-info/admin-user-info.component';

@Component({
  selector: 'app-admin-rentals',
  templateUrl: './admin-rentals.component.html',
  styleUrls: ['./admin-rentals.component.css']
})
export class AdminRentalsComponent implements OnInit{
  displayedColumns = ['id_rental','user','post','payment','start_date','end_date', 'status','actions'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(
    private rentalService: RentalService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.rentalService.GetAllRentals()
    .subscribe((response:any) =>{
      console.log(response)
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    })
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  openPost(id: any) {
    const modalRef = this.modalService.open(AdminPostInfoComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
  }
  openUser(email: any) {
    const modalRef = this.modalService.open(AdminUserInfoComponent, { size: 'lg' });
    modalRef.componentInstance.email = email;
  }

  refreshRental(id:any) {
    this.rentalService.GetRentalById(id)
    .subscribe(
      (response:any) => {
        const endDate = new Date(response.request.end_date);
        const startDate = new Date(response.request.start_date);
        const currentDate = new Date();
        if (currentDate.getTime() < startDate.getTime()) {
          this.toastr.info('Location pas encore commencé!')
        } else if (currentDate.getTime() > endDate.getTime()) {
          const finishedRental=response
          finishedRental.status='Finished'
          delete finishedRental.id_rental;
          this.rentalService.UpdateRental(id, finishedRental, sessionStorage.getItem('token'))
          .subscribe(response => {
            this.toastr.info('Location terminé!')
            location.reload()
          })
        } else {
          this.toastr.info('Location en cours!')
          
        }
      }
    )
  }


}
