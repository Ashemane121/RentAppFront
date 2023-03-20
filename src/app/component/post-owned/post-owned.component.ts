import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-owned',
  templateUrl: './post-owned.component.html',
  styleUrls: ['./post-owned.component.css']
})
export class PostOwnedComponent implements OnInit {
  constructor(private postService: PostService) { }
  myPosts: any[] = [];
  myPostsId: any[] = [];

  ngOnInit() {
    this.postService.GetPostsByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token')).subscribe(response => {
      this.myPosts = response;
    });
    this.postService.GetPostsIdByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token')).subscribe(response => {
      this.myPostsId = response;
      //console.log('all my posts id : ', this.myPostsId)
    });
  }

}
