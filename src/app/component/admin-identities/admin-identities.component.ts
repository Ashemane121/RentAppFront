import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth/auth.service';
import { PostService } from 'src/app/service/post/post.service';
import { IdentityService } from 'src/app/service/identity/identity.service';
import { ImageDisplayComponent } from '../image-display/image-display.component';
import { AdminUserInfoComponent } from '../admin-user-info/admin-user-info.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-identities',
  templateUrl: './admin-identities.component.html',
  styleUrls: ['./admin-identities.component.css']
})
export class AdminIdentitiesComponent implements OnInit{
  displayedColumns = ['id_identity','ref','type','status','actions'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;

  constructor(
    private identityService: IdentityService,
    private authService: AuthService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.identityService.GetAllIdentities(sessionStorage.getItem('token'))
    .subscribe((response:any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    })
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
  }

  approveIdentity(id:any) {
    let identity = {
      status:''
    }
    //Get the identity
    this.identityService.GetIdentityById(id, sessionStorage.getItem('token'))
    .subscribe((response:any) => {
      identity=response
      //Update identity status to approved
      identity.status='Approved'
      this.identityService.UpdateIdentity(id, identity, sessionStorage.getItem('token'))
      .subscribe(response => {
        this.toastr.success('Vous avez approuvé la pièce d\'identité!')
        location.reload()
      })
    })
  }
  rejectIdentity(id:any) {
    let identity = {
      status:''
    }
    //Get the identity
    this.identityService.GetIdentityById(id, sessionStorage.getItem('token'))
    .subscribe((response:any) => {
      identity=response
      //Update identity status to rejected
      identity.status='Rejected'
      this.identityService.UpdateIdentity(id, identity, sessionStorage.getItem('token'))
      .subscribe(response => {
        this.toastr.success('Vous avez rejeté la pièce d\'identité!')
        location.reload()
      })
    })

  }

  openIdentity(ref: string) {
    const modalRef = this.modalService.open(ImageDisplayComponent);
    modalRef.componentInstance.imageRef = ref;
  }

  openUser(ref: any) {
    const userId = ref.substring(ref.indexOf("ref-user-") + "ref-user-".length, ref.indexOf("-", ref.indexOf("ref-user-") + "ref-user-".length))
    this.authService.GetUserById(sessionStorage.getItem('userEmail'), userId, sessionStorage.getItem('token'))
    .subscribe(
      (response:any) => {
        console.log(response)
        const modalRef = this.modalService.open(AdminUserInfoComponent, { size: 'lg' });
        modalRef.componentInstance.email = response.email;
      }
    ) 
  }
  
}
