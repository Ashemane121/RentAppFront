import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RentalService } from 'src/app/service/rental/rental.service';
import { RatingService } from 'src/app/service/rating/rating.service';
import { UploadService } from 'src/app/service/upload/upload.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rental-info',
  templateUrl: './rental-info.component.html',
  styleUrls: ['./rental-info.component.css']
})
export class RentalInfoComponent implements OnInit{
  @Input() rentalId: number=0
  rental:any = {
    request: {
      post : {
        brand :'',
        model :''
      }
    }
  }
  postImageUrl=''
  ratingControl=new FormControl(0)
  commentControl=new FormControl('')
  hasRating:boolean=false
  updating:boolean=false

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private rentalService: RentalService,
    private ratingService : RatingService,
    private uploadService : UploadService,
    private activeModal : NgbActiveModal,
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    if (this.authService.IsLoggedIn()) {
      this.rentalService.GetRentalById(this.rentalId)
      .subscribe((response:any) => {
        this.rental=response
        //get image
        this.uploadService.GetImageByRef(response.request.post.images[0])
        .subscribe((response:any)=>{
          const reader = new FileReader();
          reader.readAsDataURL(response);
          reader.onloadend = () => {
            this.postImageUrl = reader.result as string;
          };
        })
        //check rating
        if (this.rental.rating) {
          this.hasRating=true
          this.commentControl.setValue(this.rental.rating.comment)
          this.ratingControl.setValue(this.rental.rating.stars)
        }
      })
    }
    
  }

  addRating(){
    if (this.authService.IsLoggedIn()) {
      if (this.ratingControl.value) {
        const ratingValues = {
          stars : this.ratingControl.value,
          comment : this.commentControl.value 
        }        
        this.ratingService.AddRating(this.rental.id_rental, ratingValues, sessionStorage.getItem('token'))
        .subscribe((response:any) => {
          this.toastr.success('Evaluation ajoutée!')
          this.refreshModal()
        });
      } else {
        this.toastr.warning('Veuillez choisir une note!')
      }
    } else {
      this.toastr.error('Veuillez vous connecter')
    }
  }

  updateRating(){
    if (this.authService.IsLoggedIn()) {
      if (this.ratingControl.value) {
        const ratingValues = {
          stars : this.ratingControl.value,
          comment : this.commentControl.value 
        }        
        this.ratingService.UpdateRating(this.rental.rating.id_rating, ratingValues, sessionStorage.getItem('token'))
        .subscribe((response:any) => {
          this.toastr.success('Evaluation modifiée!')
          this.refreshModal()
        });
      } else {
        this.toastr.warning('Veuillez choisir une note!')
      }
    } else {
      this.toastr.error('Veuillez vous connecter')
    }
  }

  toggleUpdate() {
    this.updating = !this.updating
    if (this.updating) {

    } else {
      this.refreshModal()
    }
  }

  closeModal() {
    this.activeModal.close();
  }
  refreshModal() {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(RentalInfoComponent, { size: 'lg', animation: false });
    modalRef.componentInstance.rentalId = this.rental.id_rental;
  }
  

}
