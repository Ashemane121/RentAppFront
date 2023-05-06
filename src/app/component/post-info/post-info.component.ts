import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/service/post/post.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UploadService } from 'src/app/service/upload/upload.service';
import { ToastrService } from 'ngx-toastr'
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.css']
})
export class PostInfoComponent {
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images: any[] = [];

  id: number = 0
  currentPost:any = {
    brand:'',
    model:'',
    mat:'',
    mileage:'',
    year:'',
    description:'',
    conditions:'',
    gearbox:'',
    fuel:'',
    price:'',
    availability:'',
    status:'',
    start_date:'',
    end_date:'',
    images:''
  }
  isLoggedIn=false
  isOwned=false

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService,
    private uploadService: UploadService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id!==null){
        this.id = +id;
        //checks if the user is logged in
        if (this.authService.IsLoggedIn()) {
          this.isLoggedIn = true;
          //checks if the current user owns the post
          this.postService.PostOwned(this.id).subscribe(isOwned => {
            this.isOwned = isOwned;
            console.log('is owned = ', isOwned)
          });
        } else {
          this.isLoggedIn = false;
        }
        //fetchs post data
        this.postService.GetPostById(this.id).subscribe((response:any) => {
          this.currentPost=response
          for (const imageRef of this.currentPost.images) {
            this.uploadService.GetImageByRef(imageRef)
            .subscribe((response: any) => {
              const reader = new FileReader();
              reader.readAsDataURL(response);
              reader.onloadend = () => {
                this.images.push(reader.result as string); // save the image URL to a property on the post object
              };
            });
          }
          
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
