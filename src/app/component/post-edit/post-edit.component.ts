import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit{
  id: number = 0
  currentPost:any

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id!==null){
        this.id = +id;
        this.postService.GetPostById(this.id).subscribe((response:any) => {
          this.currentPost=response
          this.postForm.patchValue({
            brand: response.brand,
            model: response.model,
            mileage: response.mileage,
            year: response.year,
            description: response.description,
            gearbox: response.gearbox,
            fuel: response.fuel,
            price: response.price,
            start_date: response.start_date,
            end_date: response.end_date
          });
        });
        
      } else {
        this.toastr.error('Annonce introuvable')
        this.router.navigate(['posts/owned'])
      }
    });
  }

  checkCurrentPost() {
    console.log('currentPost')
    console.log(this.currentPost)
  }

  
  postForm = this.builder.group({
    brand: this.builder.control(''),
    model: this.builder.control(''),
    mileage: this.builder.control('', [Validators.pattern(/^[0-9]+$/)]),
    year: this.builder.control('', [Validators.pattern(/^[0-9]+$/)]),
    description: this.builder.control(''),
    gearbox: this.builder.control(''),
    fuel: this.builder.control(''),
    price: this.builder.control('', [Validators.pattern(/^[0-9]+$/)]),
    start_date: this.builder.control(''),
    end_date: this.builder.control(''),
    availability: true
  })
  
  EditPost() {
    if (this.authService.IsLoggedIn()) {
      if (this.postForm.valid) {
        
        const postCopy = {...this.currentPost}
        delete postCopy.id_post

        if (this.postForm.value.brand===''){
          this.postForm.patchValue({ brand: postCopy.brand })
        }
        if (this.postForm.value.model===''){
          this.postForm.patchValue({ model: postCopy.model })
        }
        if (this.postForm.value.mileage===''){
          this.postForm.patchValue({ mileage: postCopy.mileage })
        }
        if (this.postForm.value.year===''){
          this.postForm.patchValue({ year: postCopy.year })
        }
        if (this.postForm.value.description===''){
          this.postForm.patchValue({ description: postCopy.description })
        }
        if (this.postForm.value.gearbox===''){
          this.postForm.patchValue({ gearbox: postCopy.gearbox })
        }
        if (this.postForm.value.fuel===''){
          this.postForm.patchValue({ fuel: postCopy.fuel })
        }
        if (this.postForm.value.price===''){
          this.postForm.patchValue({ price: postCopy.price })
        }
        if (this.postForm.value.start_date===''){
          this.postForm.patchValue({ start_date: postCopy.start_date })
        }
        if (this.postForm.value.end_date===''){
          this.postForm.patchValue({ end_date: postCopy.end_date })
        }
        
        this.postService.UpdatePost(this.id, this.postForm.value, sessionStorage.getItem('token'))
        .subscribe((response:any) => {
          this.toastr.success('Annonce modifiée')
          this.router.navigate(['posts/owned'])
        });
      } else {
        this.toastr.warning('Veuillez entrer des informations valides')
      }
    } else {
      this.toastr.error('Veuillez vous connecter')
    }
  }

}
