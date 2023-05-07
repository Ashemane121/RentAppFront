import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post/post.service';
import { UploadService } from 'src/app/service/upload/upload.service';

@Component({
  selector: 'app-post-owned',
  templateUrl: './post-owned.component.html',
  styleUrls: ['./post-owned.component.css']
})
export class PostOwnedComponent implements OnInit {
  constructor(
    private postService: PostService,
    private uploadService: UploadService
  ) { }
  myPosts: any[] = [];
  myPostsId: any[] = [];

  ngOnInit() {
    this.postService.GetPostsByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token'))
    .subscribe(response => {
      this.myPosts = response;
      this.myPosts.forEach(post => {
        this.uploadService.GetImageByRef(post.images[0])
        .subscribe((response:any)=>{
          const reader = new FileReader();
          reader.readAsDataURL(response);
          reader.onloadend = () => {
            post.imageUrl = reader.result as string; // save the image URL to a property on the post object
          };
        })
      })
    });
    this.postService.GetPostsIdByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token'))
    .subscribe(response => {
      this.myPostsId = response;
      //console.log('all my posts id : ', this.myPostsId)
    });
  }

}
