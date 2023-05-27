import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  
  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  isLoggedIn=false
  userRole:any

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

  CheckSessionStorage() {
    console.log('this is for testing purposes, this is the current token and user if exists :')
    console.log(sessionStorage.getItem('token'))
    console.log(sessionStorage.getItem('userId'))
    console.log(sessionStorage.getItem('userEmail'))
    console.log(sessionStorage.getItem('userRole'))
  }


}
