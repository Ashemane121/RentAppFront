import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile-settings',
  templateUrl: './user-profile-settings.component.html',
  styleUrls: ['./user-profile-settings.component.css']
})
export class UserProfileSettingsComponent {
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,

  ) { }

  pwForm = this.builder.group({
    old_pw: this.builder.control('', Validators.required),
    new_pw: this.builder.control('', Validators.required),
    confirm_pw: this.builder.control('', Validators.required)
  })
  emailForm = this.builder.group({
    old_email: this.builder.control('', Validators.required),
    new_email: this.builder.control('', Validators.required),
    pw: this.builder.control('', Validators.required)
  })

  pwChange(){
    if (this.pwForm.valid){
      const loginValues = { 
        email : sessionStorage.getItem('userEmail'),
        password : this.pwForm.value.old_pw
      }
      this.authService.Login(loginValues)
      .subscribe(
        (response: any) => {
          sessionStorage.setItem('token', response.token)
          this.authService.SetTokenTimeout()
          const new_pw = this.pwForm.value.new_pw
          const confirm_pw = this.pwForm.value.confirm_pw
          if (new_pw===confirm_pw){
            const pwChangeValues = {
              email : sessionStorage.getItem('userEmail'),
              newPassword : new_pw
            }
            this.authService.UpdatePassword(pwChangeValues, sessionStorage.getItem('token'))
            .subscribe(
              (response: any) => {
                this.toastr.success('Mot de passe changé avec succès')
                sessionStorage.setItem('token', response.token)
                this.authService.SetTokenTimeout()
              },
              (error: any) => {
                console.error(error)
                this.toastr.warning("Une erreur s'est produite")
              }
            )
          } else {
            this.toastr.warning('Veuillez confirmer votre mot de passe proprement')
          }
        },
        (error: any) => {
          console.error(error)
          this.toastr.warning('Ancien mot de passe incorrecte')
        }
      )
    } else {
      this.toastr.error('Veuillez remplir tous les champs de manière valide!')
    }
  }

  emailChange(){
    if (this.emailForm.valid){
      const old_email = this.emailForm.value.old_email
      const new_email = this.emailForm.value.new_email
      if (old_email===sessionStorage.getItem('userEmail')){
        if (old_email!==new_email) {
          const loginValues = { 
            email : sessionStorage.getItem('userEmail'),
            password : this.emailForm.value.pw
          }
          this.authService.Login(loginValues)
          .subscribe(
            (response: any) => {
              sessionStorage.setItem('token', response.token)
              this.authService.SetTokenTimeout()
              this.authService.CheckEmail(new_email)
              .subscribe(
                (response:any) => {
                  this.toastr.warning("L'adresse email existe déjà!")
                }, (error:any) => {
                  const emailChangeValues = {
                    oldEmail : old_email,
                    newEmail : new_email
                  }
                  this.authService.UpdateEmail(emailChangeValues, sessionStorage.getItem('token'))
                  .subscribe(
                    (response: any) => {
                      this.toastr.success('Adresse email changée avec succès')
                      sessionStorage.setItem('token', response.token)
                      sessionStorage.setItem('userEmail', new_email?new_email:'')
                      console.log(sessionStorage.getItem('userEmail'))
                      this.authService.SetTokenTimeout()
                    },
                    (error: any) => {
                      console.error(error)
                      this.toastr.warning("Une erreur s'est produite")
                    }
                  )
                }
              )
            },
            (error: any) => {
              console.error(error)
              this.toastr.warning('Mot de passe incorrecte!')
            }
          )
        }else {
          this.toastr.warning("L'ancienne adresse email est identique à la nouvelle!")
        }        
      }else{
        this.toastr.warning("L'ancienne adresse email est invalide!")
      }
    } else {
      this.toastr.error('Veuillez remplir tous le champs de manière valide!')
    }
  }

}
