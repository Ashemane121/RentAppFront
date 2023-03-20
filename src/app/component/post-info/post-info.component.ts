import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.css']
})
export class PostInfoComponent {
  id: number = 0
  currentPost:any = {
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
  isOwned=false

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    //checks if the user is logged in
    if (this.authService.IsLoggedIn()) {
      this.isLoggedIn = true;
      //checks if the current user owns the post
      this.postService.GetPostsIdByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token')).subscribe(response => {
        const myPostsId = response;
        if (myPostsId.includes(this.id)) {
          this.isOwned=true
        } else {
          this.isOwned=false
        }
      });
    } else {
      this.isLoggedIn = false;
    }
    //fetchs post data
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id!==null){
        this.id = +id;
        this.postService.GetPostById(this.id).subscribe((response:any) => {
          this.currentPost=response
        });
      } else {
        this.toastr.error('Annonce introuvable')
        this.router.navigate(['posts'])
      }
    });
    
  }

  CheckSessionStorage(){
    console.log('id : ',this.id)
    console.log('current post : ',this.currentPost)
    console.log('am i logged in ? : ',this.isLoggedIn)
    console.log('do i own this ? : ',this.isOwned)
  }
}
