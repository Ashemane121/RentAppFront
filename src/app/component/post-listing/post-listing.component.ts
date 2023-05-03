import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post/post.service';
import { UploadService } from 'src/app/service/upload/upload.service';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.css']
})
export class PostListingComponent implements OnInit{
  constructor(
    private postService: PostService,
    private uploadService: UploadService
  ) { }
  posts: any[] = [];
  testImage:any;

  ngOnInit() {
    this.postService.GetAllPosts().subscribe(response => {
      this.posts = response;
      this.posts.forEach(post => {
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
  }

  test(){
    this.uploadService.GetImageByRef('ref-post-1234567-1')
    .subscribe((response: any) => {
      const reader = new FileReader();
      reader.readAsDataURL(response);
      reader.onloadend = () => {
        console.log(reader.result);
        this.testImage = reader.result as string;
  
        // Create URL for image data
        const imageUrl = URL.createObjectURL(response);
  
      };
    });
  }
  

}
