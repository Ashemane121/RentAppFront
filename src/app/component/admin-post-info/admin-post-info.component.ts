import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private authService: AuthService,
    private postService: PostService,
    private router: Router,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<AdminPostInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
) {
    if (data && data.id) {
        this.id = +data.id;
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
    } else {
        this.toastr.error('Annonce introuvable')
        this.router.navigate(['admin/dashboard'])
    }
}

ngOnInit() {}

onClose(): void {
    this.dialogRef.close();
}


}


