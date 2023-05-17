import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/service/post/post.service';
import { AuthService } from 'src/app/service/auth/auth.service';
import { UploadService } from 'src/app/service/upload/upload.service';
import { RentalService } from 'src/app/service/rental/rental.service';
import { RatingService } from 'src/app/service/rating/rating.service';
import { ToastrService } from 'ngx-toastr'
import { RentalCreateComponent } from '../rental-create/rental-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.css']
})
export class PostInfoComponent {
  images: any[] = []
  rentedDates: any[] = []
  rate=0
  ratings: any[] = []
  ratingsWithComments: any[] = []
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
    private rentalService: RentalService,
    private ratingService: RatingService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {

  }
  hoveredDate: NgbDate | null = null
	fromDate: any
	toDate: any

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date
    } else {
      this.toDate = null
      this.fromDate = date
    }
  }
  isDisabled(date: NgbDate) {
    const today = new Date();
    const selectedDate = new Date(date.year, date.month - 1, date.day);
    const start_date = new Date(this.currentPost.start_date);
    const end_date = new Date(this.currentPost.end_date);
    return selectedDate < today || selectedDate < start_date || selectedDate > end_date;
  }
  
  isRent(date: NgbDate) {
    const dateString = `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`;
    for (let i = 0; i < this.rentedDates.length; i++) {
      const start = this.rentedDates[i].start;
      const end = this.rentedDates[i].end;
      if (dateString >= start && dateString <= end) {
        return true;
      }
    }
    return false;  
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
          });
        } else {
          this.isLoggedIn = false;
        }
        //fetchs post data
        this.postService.GetPostById(this.id).subscribe((response:any) => {
          this.currentPost=response
          //get post images
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
          //get post rental dates
          this.rentalService.GetRentalsByPostId(this.currentPost.id_post)
          .subscribe((response:any) => {
            response.forEach((rental:any) => {
              const rent = {
                start:rental.request.start_date,
                end:rental.request.end_date
              }
              this.rentedDates.push(rent)
              if (rental.rating) {
                this.ratings.push(rental.rating)
                if (rental.rating.comment) {
                  this.ratingsWithComments.push(rental.rating)
                }
              }
            })
            const totalStars = this.ratings.reduce((sum, rating) => sum + rating.stars, 0)
            this.rate = totalStars / this.ratings.length
          })
          
        });
      } else {
        this.toastr.error('Annonce introuvable')
        this.router.navigate(['posts'])
      }
    });
  }

  createRental(id: any) {
    const modalRef = this.modalService.open(RentalCreateComponent, { size: 'lg' });
    modalRef.componentInstance.postId = id;
  }
}
