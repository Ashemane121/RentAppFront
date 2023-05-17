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
  selector: 'app-admin-ratings',
  templateUrl: './admin-ratings.component.html',
  styleUrls: ['./admin-ratings.component.css']
})
export class AdminRatingsComponent implements OnInit{
  displayedColumns = ['id_rating','user','post','stars', 'comment', 'actions'];
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
      const rentalsWithRatings: any[] =[]
      response.forEach((rental:any) => {
        if (rental.rating) {
          rentalsWithRatings.push(rental)
        }
      })
      this.dataSource = new MatTableDataSource(rentalsWithRatings);
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

}
