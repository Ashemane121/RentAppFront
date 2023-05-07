import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  currentUser:any = {
    id:'' ,
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
    role: '',
    profilePicture:'',
  }
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    // get user data from authService and populate form
    this.authService.GetUserByEmail(sessionStorage.getItem('userEmail'),sessionStorage.getItem('token'))
    .subscribe((Response:any)=>{
      this.currentUser=Response
      this.userForm.patchValue({
        firstname: Response.firstname,
        lastname: Response.lastname,
        phone: Response.phone,
        address: Response.address,
        email:Response.email

      });
    });

  }
  userForm = this.builder.group({
    firstname: this.builder.control(''),
    lastname: this.builder.control(''),
    phone: this.builder.control(''),
    address: this.builder.control(''),
    email:sessionStorage.getItem('userEmail')


  })

  onSubmit(): void {
    // perform submit action and update user data in authService
    if (this.authService.IsLoggedIn()) {
      if (this.userForm.valid) {

        const userCopy = {...this.currentUser}
        delete userCopy.id
        delete userCopy.role
        delete userCopy.profilePicture


        if (this.userForm.value.firstname===''){
          this.userForm.patchValue({ firstname: userCopy.firstname })
        }
        if (this.userForm.value.lastname===''){
          this.userForm.patchValue({ lastname: userCopy.lastname })
        }
        if (this.userForm.value.phone===''){
          this.userForm.patchValue({ phone: userCopy.phone })
        }
        if (this.userForm.value.address===''){
          this.userForm.patchValue({ address: userCopy.address })
        }
        this.authService.Update(this.userForm.value, sessionStorage.getItem('token'))
        .subscribe((response:any) => {
          sessionStorage.setItem('token',response.token)
          this.authService.SetTokenTimeout()
          this.toastr.success('Profil modifié')
        });
      } else {
        this.toastr.warning('Veuillez entrer des informations valides')
      }
    } else {
      this.toastr.error('Veuillez vous connecter')
    }
  }
  }

