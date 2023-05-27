import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  constructor(private router:Router) {}
  activeComponent = 'login'; 

  setActiveComponent(component: string) {
    this.activeComponent = component;
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

}
