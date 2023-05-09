import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UploadService } from 'src/app/service/upload/upload.service';
import { IdentityService } from 'src/app/service/identity/identity.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile-identity',
  templateUrl: './user-profile-identity.component.html',
  styleUrls: ['./user-profile-identity.component.css']
})
export class UserProfileIdentityComponent implements OnInit{
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
  profilePictureUrl='assets/bg.png'
  selectedFilesCIN: File[] = [];
  selectedFilesPDC: File[] = [];
  newImagesCIN: any[] = [];
  newImagesPDC: any[] = [];
  identities: any[] = [];
  identitiesCIN: any[] = [];
  identitiesPDC: any[] = [];

  constructor(
    private router: Router,
    private builder: FormBuilder,
    private authService: AuthService,
    private uploadService: UploadService,
    private identiyService: IdentityService,
    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    // get user data from authService and populate form
    this.authService.GetUserByEmail(sessionStorage.getItem('userEmail'),sessionStorage.getItem('token'))
    .subscribe((Response:any)=>{
      this.currentUser=Response
      //get profile picture
      if (this.currentUser.profilePicture) {
        this.uploadService.GetImageByRef(this.currentUser.profilePicture)
        .subscribe(
          (response:any) => {
            const reader = new FileReader()
            reader.readAsDataURL(response)
            reader.onloadend = () => {
              this.profilePictureUrl = reader.result as string // save the image URL to a property on the post object
            };
          }
        )
      }
      // get identity pieces
      this.identiyService.GetIdentitiesByUserId(sessionStorage.getItem('userId'),sessionStorage.getItem('token'))
      .subscribe((response:any)=>{
        this.identities=response;
        console.log(this.identities)
        let iPDC = 0
        let iCIN = 0
        for (let i = 0; i < this.identities.length; i++){
          this.uploadService.GetImageByRef(this.identities[i].ref)
          .subscribe(
            (response:any) => {
              const reader = new FileReader()
              reader.readAsDataURL(response)
              reader.onloadend = () => {
                if(this.identities[i].type==='PDC') {
                  this.identitiesPDC.push(this.identities[i])
                  this.identitiesPDC[iPDC].url=reader.result as string
                  iPDC++
                } else if (this.identities[i].type==='CIN'){
                  this.identitiesCIN.push(this.identities[i])
                  this.identitiesCIN[iCIN].url=reader.result as string
                  iCIN++
                }
              };
            }
          )
        }
      })
    });
  }

  onSelectFilePDC(event: any) {
    this.newImagesPDC = []
    const files: File[] = event.target.files
    this.selectedFilesPDC = files
    const numFiles = files.length
    const handleFileLoad = (event: any) => {
      this.newImagesPDC.push(event.target.result)
    };
    for (let i = 0; i < numFiles; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = handleFileLoad
      reader.readAsDataURL(file)
    }
  }
  onSelectFileCIN(event: any) {
    this.newImagesCIN = []
    const files: File[] = event.target.files
    this.selectedFilesCIN = files
    const numFiles = files.length
    const handleFileLoad = (event: any) => {
      this.newImagesCIN.push(event.target.result)
    };
    for (let i = 0; i < numFiles; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = handleFileLoad
      reader.readAsDataURL(file)
    }
  }
  

  upload(selectedFiles: File[], type:string){
    if (selectedFiles.length === 0) {
      this.toastr.warning('Veuillez selectionner des images!')
      return;
    }
    for(let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      let maxNumber = 0;
      if(type==='PDC') {
        if (this.identitiesPDC.length>0) {
          this.identitiesPDC.forEach((identity: any) => {
            const refNumber = parseInt(identity.ref.split('-').pop());
            if (refNumber > maxNumber) {
              maxNumber = refNumber;
            }
          });
        }
      } else if (type==='CIN'){
        if (this.identitiesCIN.length>0) {
          this.identitiesCIN.forEach((identity: any) => {
            const refNumber = parseInt(identity.ref.split('-').pop());
            if (refNumber > maxNumber) {
              maxNumber = refNumber;
            }
          });
        }      
      }
      const ref = `ref-user-${sessionStorage.getItem('userId')}-identity-${type}-${maxNumber+i+1}`;
      console.log(ref)
      this.uploadService.UploadImage(file, ref, sessionStorage.getItem('token'))
      .subscribe(
        (response) => {},
        (error) => {
          if (error && error.error.text.indexOf('file uploaded successfully') > -1) {
            const identity = {
              ref : ref,
              type : type,
              status : 'Pending'
            }
            this.identiyService.AddIdentity(sessionStorage.getItem('userId'),identity, sessionStorage.getItem('token'))
            .subscribe(
              (response:any) => {
                window.location.reload();
                this.toastr.success('Pièce d\'identité ajouté avec succès!')
              }
            )
          } else {
            this.toastr.error('Une erreur s\'est produite lors de l\'ajout de la pièce d\'identité.');
          }
        }
      );
      
    }
  }
  
  removeImage(url: any, images: string[], type:string) {
    const index = images.indexOf(url)
    if (index > -1) {
      images.splice(index, 1)
    }
    let fileList:File[] = []
    if (type==='PDC'){
      let filesArray = Array.from(this.selectedFilesPDC)
      filesArray.splice(index, 1)
      for (let i = 0; i < filesArray.length; i++) {
        fileList.push(filesArray[i])
      }
      this.selectedFilesPDC=fileList
    } else if (type==='CIN'){
      let filesArray = Array.from(this.selectedFilesCIN)
      filesArray.splice(index, 1)
      for (let i = 0; i < filesArray.length; i++) {
        fileList.push(filesArray[i])
      }
      this.selectedFilesCIN=fileList
    }
  }

  removeIdentity(identity:any){
    this.uploadService.DeleteImageByRef(identity.ref,sessionStorage.getItem('token'))
    .subscribe(
      (response) => {},
      (error) => {
        if (error && error.error.text.indexOf('File deleted successfully') > -1) {
          this.identiyService.DeleteIdentity(identity.id_identity,sessionStorage.getItem('token'))
          .subscribe(
            (response:any) => {
              window.location.reload();
              this.toastr.success('Pièce d\'identité supprimé avec succès')
            }
          )
        } else {
          this.toastr.error('Une erreur s\'est produite lors de la suppression de la pièce d\'identité.');
        }
      }
    )
  }
}
