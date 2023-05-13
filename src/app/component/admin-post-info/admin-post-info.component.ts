import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/service/post/post.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-admin-post-info',
  templateUrl: './admin-post-info.component.html',
  styleUrls: ['./admin-post-info.component.css']
})
export class AdminPostInfoComponent implements OnInit {
  @Input() id: any;
  currentPost:any = {}
  isLoggedIn=false
  isOwned=false

    constructor(
        private authService: AuthService,
        private postService: PostService,
        private router: Router,
        private toastr: ToastrService,
        private activeModal: NgbActiveModal
    ) {}

    ngOnInit() {
    //checks if the user is logged in
    if (this.authService.IsAdmin()) {
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
    });
    }

    closeModal() {
        this.activeModal.close();
    }


}


