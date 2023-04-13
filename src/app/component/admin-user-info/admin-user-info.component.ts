import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-admin-user-info',
  templateUrl: './admin-user-info.component.html',
  styleUrls: ['./admin-user-info.component.css']
})
export class AdminUserInfoComponent implements OnInit{
  email: string =''
  currentUser:any = {
    brand:'',
    model:'',
    mileage:'',
    year:'',
    description:'',
    gearbox:'',
    fuel:'',
    price:'',
    availability:'',
    start_date:'',
    end_date:''
  }
  isLoggedIn=false

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AdminUserInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { email: string }
) {
    if (data && data.email) {
        this.email = data.email;
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
    } else {
        this.toastr.error('Utilisateur introuvable')
        this.router.navigate(['admin/dashboard'])
    }
}

ngOnInit() {}

onClose(): void {
    this.dialogRef.close();
}


}




