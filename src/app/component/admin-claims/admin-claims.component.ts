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
import { ClaimService } from 'src/app/service/claim/claim.service';

@Component({
  selector: 'app-admin-claims',
  templateUrl: './admin-claims.component.html',
  styleUrls: ['./admin-claims.component.css']
})
export class AdminClaimsComponent implements OnInit{
  displayedColumns = ['id_claim','user','post','type', 'subject', 'status', 'actions'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(
    private rentalService: RentalService,
    private claimService: ClaimService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.rentalService.GetAllRentals()
    .subscribe((response:any) =>{
      const rentalsWithClaims: any[] =[]
      response.forEach((rental:any) => {
        if (rental.claim) {
          rentalsWithClaims.push(rental)
        }
      })
      this.dataSource = new MatTableDataSource(rentalsWithClaims);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    })
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  rejectClaim(id:any) {
    //Get the claim
    this.claimService.GetClaimById(id, sessionStorage.getItem('token'))
    .subscribe((response:any) => {
      const claimValues = {
        type : response.type,
        subject: response.subject,
        status: 'Declined'
      }
      //update claim
      this.claimService.UpdateClaim(id, claimValues, sessionStorage.getItem('token'))
      .subscribe(response => {
        this.toastr.info('Réclamation refusé!')
        location.reload()
      })
    })
  }

  approveClaim(id:any) {
    //Get the claim
    this.claimService.GetClaimById(id, sessionStorage.getItem('token'))
    .subscribe((response:any) => {
      const claimValues = {
        type : response.type,
        subject: response.subject,
        status: 'Approved'
      }
      //update claim
      this.claimService.UpdateClaim(id, claimValues, sessionStorage.getItem('token'))
      .subscribe(response => {
        this.toastr.info('Réclamation approuvée!')
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
