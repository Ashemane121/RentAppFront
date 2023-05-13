import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/service/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminUserInfoComponent } from '../admin-user-info/admin-user-info.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit{
  displayedColumns = ['id','firstname','lastname','email','actions'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(
    private service: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.service.GetUsers(sessionStorage.getItem('userEmail'), sessionStorage.getItem('token'))
    .subscribe((response:any) =>{
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    })
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  openUser(email: any) {
    const modalRef = this.modalService.open(AdminUserInfoComponent, { size: 'lg' });
    modalRef.componentInstance.email = email;
  }

}
