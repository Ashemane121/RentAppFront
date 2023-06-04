import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post/post.service';
import { UploadService } from 'src/app/service/upload/upload.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RentalService } from 'src/app/service/rental/rental.service';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrls: ['./post-listing.component.css']
})
export class PostListingComponent implements OnInit{
  constructor(
    private postService: PostService,
    private uploadService: UploadService,
    private rentalService: RentalService,
    private calendar: NgbCalendar, public formatter: NgbDateParserFormatter
  ) {	
		//this.fromDate = calendar.getNext(calendar.getToday(), 'd', 1)
		//this.toDate = calendar.getNext(calendar.getToday(), 'd', 10)
    this.isDisabled = (date: NgbDate, current: {month: number}) => {
      const today = new Date();
      const selectedDate = new Date(date.year, date.month - 1, date.day);
    
      if (this.fromDate && !this.toDate) {
        // Disable all dates before fromDate or after fromDate + 10 days
        const fromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
        const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 20);
        return selectedDate < fromDate || selectedDate > toDate;
      }
    
      return selectedDate < today;
    }
    
  }
  hoveredDate: NgbDate | null = null
	fromDate: any
	toDate: any
	isDisabled: any

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
  isStart(date: NgbDate): boolean {
    return this.fromDate && date.equals(this.fromDate);
  }

  isEnd(date: NgbDate): boolean {
    return this.toDate && date.equals(this.toDate);
  }
  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    )
  }
  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate)
  }
  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    )
  }
  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input)
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue
  }

  posts: any[] = []
  filteredPosts: any[] = []
  filter:any = {
    brand: [],
    gearbox: [],
    fuel: []
  }
  brands: any[] = ['Peugeot', 'Citroen', 'Renault', 'Fiat', 'Toyota', 'Ford']
  gearboxes: any[] = ['Automatique', 'Manuelle']
  fuels: any[] = ['Essence', 'Electrique', 'Hybride']

  ngOnInit() {
    this.postService.GetAllPosts().subscribe(response => {
      this.posts = response;
      this.filteredPosts=this.posts
      this.posts.forEach(post => {
        const brand = post.brand
        const isBrandExist = this.brands.some(existingBrand => existingBrand === brand)
        if (!isBrandExist) {
          this.brands.push(brand);
        }
        this.uploadService.GetImageByRef(post.images[0])
        .subscribe((response:any)=>{
          const reader = new FileReader();
          reader.readAsDataURL(response);
          reader.onloadend = () => {
            post.imageUrl = reader.result as string; // save the image URL to a property on the post object
          };
          post.ratings=[]
          //get post rental dates
          this.rentalService.GetRentalsByPostId(post.id_post)
          .subscribe((response:any) => {
            response.forEach((rental:any) => {              
              if (rental.rating) {
                post.ratings.push(rental.rating)
              }
            })
            const totalStars = post.ratings.reduce((sum:any, rating:any) => sum + rating.stars, 0)
            post.rate = totalStars / post.ratings.length
          })
          
        })
      })
    });
  }

  filterPostsDate(){
    this.filterPosts()
    if (this.fromDate && this.toDate) {
      const filteredPostsByDate:any[] = []
      const start_date = new Date(`${this.fromDate.year}-${this.fromDate.month.toString().padStart(2, '0')}-${this.fromDate.day.toString().padStart(2, '0')}`)
      const end_date = new Date(`${this.toDate.year}-${this.toDate.month.toString().padStart(2, '0')}-${this.toDate.day.toString().padStart(2, '0')}`)
      this.filteredPosts.forEach(post => {
        let postStartDate = new Date(post.start_date)
        let postEndDate = new Date(post.end_date)
        if (postStartDate<=start_date && postEndDate>=end_date){
          filteredPostsByDate.push(post)
        }
      });
      this.filteredPosts=filteredPostsByDate
    } 
  }

  filterPosts() {
    if (!this.filter.brand.length && !this.filter.fuel.length && !this.filter.gearbox.length) {
      this.filteredPosts = this.posts
      return
    }
    this.filteredPosts = [];
    this.posts.forEach(post => {
      // Check if post matches any filter criteria
      const hasBrand = this.filter.brand.includes(post.brand);
      const hasFuel = this.filter.fuel.includes(post.fuel);
      const hasGearbox = this.filter.gearbox.includes(post.gearbox);
      // Push post into filteredPosts if it matches any filter criteria
      if (hasBrand || hasFuel || hasGearbox) {
        const exists = this.filteredPosts.some(p => p.id_post === post.id_post);
        if (!exists) {
          this.filteredPosts.push(post);
        }
      }
    });
  }
  

  onCheckboxChange(event: Event, filterType: string, filterValue: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.filter[filterType].push(filterValue)
    } else {
      const index = this.filter[filterType].indexOf(filterValue)
      if (index !== -1) {
        this.filter[filterType].splice(index, 1)
      }
    }
    this.filterPosts()
  }
  
  
  

}
