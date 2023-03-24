import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post/post.service';
import { AuthService } from 'src/app/service/auth/auth.service';
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
    private router: Router,
    private toastr: ToastrService
  ) {

  }


  postForm = this.builder.group({
    brand: this.builder.control('', Validators.compose([Validators.required])),
    model: this.builder.control('', Validators.compose([Validators.required])),
    mileage: this.builder.control('', Validators.compose([Validators.required])),
    year: this.builder.control('', Validators.compose([Validators.required])),
    description: this.builder.control('', Validators.compose([Validators.required])),
    gearbox: this.builder.control('', Validators.compose([Validators.required])),
    fuel: this.builder.control('', Validators.compose([Validators.required])),
    price: this.builder.control('', Validators.compose([Validators.required])),
    start_date: this.builder.control('', Validators.compose([Validators.required])),
    end_date: this.builder.control('', Validators.compose([Validators.required])),
    availability: true
  })
  
  

  AddPost() {
    if (this.authService.IsLoggedIn()) {
      if (this.postForm.valid) {
        this.postService.AddPost(sessionStorage.getItem('userId'),this.postForm.value, sessionStorage.getItem('token'))
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
