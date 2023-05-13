import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-admin-user-info',
  templateUrl: './admin-user-info.component.html',
  styleUrls: ['./admin-user-info.component.css']
})
export class AdminUserInfoComponent implements OnInit{
  @Input() email: string='';
  currentUser:any = {}
  isLoggedIn=false

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private activeModal: NgbActiveModal
    ) {}

    ngOnInit() {
        //checks if the user is logged in
        if (this.authService.IsAdmin()) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
        //fetchs user data
        this.authService.GetUserByEmail(this.email, sessionStorage.getItem('token'))
        .subscribe((response:any) => {
            this.currentUser=response
        });
    }

    closeModal() {
    this.activeModal.close();
    }

}




