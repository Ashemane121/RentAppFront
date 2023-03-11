import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private router: Router) {
      sessionStorage.clear();

  }
  result: any;

  loginform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.LoginAdmin(this.loginform.value).subscribe(
        (response: any) => {
          this.toastr.success('Logged in successfully')
          sessionStorage.setItem('token', response.token)
          this.service.refresh()
          // testing if token exists
            const token = sessionStorage.getItem('token');
            console.log(token);
          this.router.navigate(['admin/dashboard'])
        },
        (error: any) => {
          console.error(error)
          this.toastr.warning('Incorrect Email or Password.')
          // handle the error response, such as displaying an error message to the user
        }
      );
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }

}
