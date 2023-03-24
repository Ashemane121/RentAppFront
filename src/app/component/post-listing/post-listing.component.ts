import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post/post.service';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.css']
})
export class PostListingComponent implements OnInit{
  constructor(private postService: PostService) { }
  posts: any[] = [];

  ngOnInit() {
    this.postService.GetAllPosts().subscribe(response => {
      this.posts = response;
    });
  }
}
