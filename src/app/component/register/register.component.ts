import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService) {

  }


  registerform = this.builder.group({
    firstname: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]*$')])),
    lastname: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]*$')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    //password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    password: this.builder.control('', Validators.compose([Validators.required])),
  })

  getCurrentUser(email:any, token:any){
    this.service.GetUserByEmail(email,token).subscribe(
      (response:any) => {
        sessionStorage.setItem('userId', response.id)
        sessionStorage.setItem('userEmail', response.email)
        /*add the rest of the user's informations here
        *
        *
        * 
        * 
        */
      }
    )
  }

  proceedregister() {
    if (this.registerform.valid) {
      this.service.RegisterUser(this.registerform.value).subscribe((response:any) => {
        this.toastr.success('Please verify your account.','Registered successfully')
        sessionStorage.setItem('token', response.token)
        this.getCurrentUser(this.registerform.get('email')?.value, sessionStorage.getItem('token'))
        this.service.refresh()
        // testing if token exists
          const token = sessionStorage.getItem('token');
          console.log(token);
        this.router.navigate(['home'])
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
  

}
