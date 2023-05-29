import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UploadService } from 'src/app/service/upload/upload.service';
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
  profilePictureUrl='assets/avatar.png'
  selectedFiles: File[] = [];
  selectedFile: File | null = null;


  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private uploadService: UploadService,
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
      if (this.currentUser.profilePicture) {
        this.uploadService.GetImageByRef(this.currentUser.profilePicture)
        .subscribe(
          (response:any) => {
            const reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend = () => {
              this.profilePictureUrl = reader.result as string; // save the image URL to a property on the post object
            };
          }
        )
      }
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

  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onloadend = () => {
        this.profilePictureUrl = reader.result as string
      };
      const files: File[] = event.target.files;
      this.selectedFiles = files;
    }
  }

  changeProfilePic(){
    if (this.selectedFiles.length>0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const file = this.selectedFiles[i];
        const ref = `ref-user-profile-pic-${sessionStorage.getItem('userId')}`;
        this.uploadService.UploadImage(file, ref, sessionStorage.getItem('token'))
        .subscribe(
          (response:any) => { },
          (error:any) => {
            console.error(error);
            if (error && error.error.text.indexOf('file uploaded successfully') > -1) {
              const updateProfilePicValues = {
                email : sessionStorage.getItem('userEmail'),
                profilePicture : ref
              }
              this.authService.UpdateProfilePicture(updateProfilePicValues, sessionStorage.getItem('token'))
              .subscribe(
                (response:any) => {
                  sessionStorage.setItem('token',response.token)
                  this.authService.SetTokenTimeout()
                  this.toastr.success('Photo de profil changé avec succès!')
                }
              )
            } else {
              this.toastr.error('Une erreur s\'est produite lors du changement de photo de profil.');
              console.log(error.status)
              console.log(error.error.text)
            }
          }
        );
      }
    } else {
      this.toastr.error('Veuillez sélectionner une photo de profile!');
    }
  }
  
}

