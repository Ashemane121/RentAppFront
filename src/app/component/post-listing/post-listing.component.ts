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
  filteredPosts: any[] = [];
  filter:any = {
    brand: [],
    gearbox: [],
    fuel: []
  };  
  brands: any[] = ['Peugeot', 'Citroen', 'Renault', 'Fiat', 'Toyota', 'Ford'];
  gearboxes: any[] = ['Automatique', 'Manuelle'];
  fuels: any[] = ['Essence', 'Electrique', 'Hybride'];

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
          
        })
      })
    });
  }

  filterPosts() {
    if (!this.filter.brand.length && !this.filter.fuel.length && !this.filter.gearbox.length) {
      this.filteredPosts = this.posts;
      return;
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
