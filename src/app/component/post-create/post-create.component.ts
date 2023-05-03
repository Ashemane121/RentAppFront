import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post/post.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UploadService } from 'src/app/service/upload/upload.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private uploadService: UploadService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  selectedFiles: File[] = [];

  postForm = this.builder.group({
    mat: this.builder.control('', Validators.compose([Validators.required])),
    brand: this.builder.control('', Validators.compose([Validators.required])),
    model: this.builder.control('', Validators.compose([Validators.required])),
    mileage: this.builder.control('', Validators.compose([Validators.required])),
    year: this.builder.control('', Validators.compose([Validators.required])),
    description: this.builder.control('', Validators.compose([Validators.required])),
    conditions: this.builder.control('', Validators.compose([Validators.required])),
    gearbox: this.builder.control('', Validators.compose([Validators.required])),
    fuel: this.builder.control('', Validators.compose([Validators.required])),
    price: this.builder.control('', Validators.compose([Validators.required])),
    start_date: this.builder.control('', Validators.compose([Validators.required])),
    end_date: this.builder.control('', Validators.compose([Validators.required])),
    availability: true,
    images : this.builder.array([])
  })

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const files: File[] = event.target.files;
      this.selectedFiles = files;
    }
  }

  upload(){
    for(let i = 0; i < this.selectedFiles.length; i++) {
      const file = this.selectedFiles[i];
      const ref = 'ref-' + i;
      console.log(ref)
      this.uploadService.UploadImage(file, ref, sessionStorage.getItem('token'))
      .subscribe(
        (response) => {
          console.log(response); // handle success response
        }
      );
    }
  }

  AddPost() {
    if (this.authService.IsLoggedIn()) {
      if (this.postForm.valid) {
        const formCopy = this.postForm.value;
        const images: string[] = [];
        for (let i = 0; i < this.selectedFiles.length; i++) {
          const file = this.selectedFiles[i];
          const ref = `ref-post-${formCopy.mat}-${i}`;
          images.push(ref);
          this.uploadService.UploadImage(file, ref, sessionStorage.getItem('token'))
          .subscribe(
            (response) => {
              console.log(response); // handle success response
            }
          );
        }
        formCopy.images=images
        this.postService.AddPost(sessionStorage.getItem('userId'),formCopy, sessionStorage.getItem('token'))
        .subscribe((response:any) => {

          this.toastr.success('Annonce créée')
          //this.authService.refresh()
          this.router.navigate(['posts'])
        });
      } else {
        this.toastr.warning('Veuillez entrer des informations valides')
      }
    } else {
      this.toastr.error('Veuillez vous connecter')
    }
  }
  

}
