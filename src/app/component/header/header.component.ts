import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr'
import { Router, NavigationEnd } from '@angular/router'
import { UploadService } from 'src/app/service/upload/upload.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  constructor(
    private service: AuthService,
    private uploadService: UploadService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  isLoggedIn=false
  userRole:any
  isHome: boolean = false
  profilePictureUrl='assets/avatar.png'
  currentUser:any

  ngOnInit(): void {
    this.service.refreshComponent$.subscribe(() => {
      if (this.service.IsLoggedIn()) {
        this.isLoggedIn = true;
        this.userRole=sessionStorage.getItem('userRole')
      } else {
        this.isLoggedIn = false;
      }
      console.log('refreshed header')
    });

    if (sessionStorage.getItem('token')) {
      this.isLoggedIn = true
        this.userRole=sessionStorage.getItem('userRole')
    } else {
      this.isLoggedIn = false
    }

    this.updateIsHome();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateIsHome();
      }
    });

    this.service.GetUserByEmail(sessionStorage.getItem('userEmail'),sessionStorage.getItem('token'))
    .subscribe((response:any)=>{
      this.currentUser=response
      if (this.currentUser.profilePicture) {
        this.uploadService.GetImageByRef(this.currentUser.profilePicture)
        .subscribe(
          (response:any) => {
            const reader = new FileReader();
            reader.readAsDataURL(response);
            reader.onloadend = () => {
              this.profilePictureUrl = reader.result as string; // save the image URL to a property on the post object
            };
          }
        )
      }
    });
  }

  Logout() {
    const token = sessionStorage.getItem('token');
    if (token !== null) {
    
      this.service.Logout(token).subscribe((response:any) => {
        this.toastr.success('Logged out successfully')
        sessionStorage.clear()
        //this.service.refresh()
        location.reload()
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }

  private updateIsHome() {
    this.isHome = this.router.url === '/';
  }

  CheckSessionStorage() {
    console.log('this is for testing purposes, this is the current token and user if exists :')
    console.log(sessionStorage.getItem('token'))
    console.log(sessionStorage.getItem('userId'))
    console.log(sessionStorage.getItem('userEmail'))
    console.log(sessionStorage.getItem('userRole'))
  }


}
