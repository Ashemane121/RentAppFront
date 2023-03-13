import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLoggedIn = false;

  constructor(private service: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshComponent$.subscribe(() => {
      if (this.service.IsLoggedIn()) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      console.log('refreshed header')
      // Add the code here that you want to execute when the event is emitted
    });
  }

  Logout() {
    const token = sessionStorage.getItem('token');
    if (token !== null) {
    
      this.service.Logout(token).subscribe((response:any) => {
        this.toastr.success('Logged out successfully')
        sessionStorage.removeItem('token');
        //this.service.refresh()
        location.reload();
      });
    }
  }


}
