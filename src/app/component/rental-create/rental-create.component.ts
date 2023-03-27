import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/service/post/post.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RentalService } from 'src/app/service/rental/rental.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.css']
})
export class RentalCreateComponent implements OnInit{
  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private postService: PostService,
    private rentalService: RentalService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  postId: number = 0
  
  isLoggedIn=false
  isOwned=false

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id!==null){
        this.postId = +id;        
      } else {
        this.toastr.error('Annonce introuvable')
        this.router.navigate(['posts'])
      }
    });
    
  }

  requestForm = this.builder.group({
    payment_method: this.builder.control('', Validators.compose([Validators.required])),
    start_date: this.builder.control('', Validators.compose([Validators.required])),
    end_date: this.builder.control('', Validators.compose([Validators.required])),
    status: 'Pending'
  })
  
  

  AddRequest() {
    if (this.authService.IsLoggedIn()) {
      if (this.requestForm.valid) {
        this.rentalService.AddRequest(sessionStorage.getItem('userId'),this.postId,this.requestForm.value, sessionStorage.getItem('token'))
        .subscribe((response:any) => {
          this.toastr.success('Demande de location envoyé')
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
