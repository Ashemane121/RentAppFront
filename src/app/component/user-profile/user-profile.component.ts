import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  activeComponent= 'edit'; 
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegments => {
      const url = urlSegments.join('/');

      if (url === 'user/profile/edit') {
        this.activeComponent = 'edit';
      } else if (url === 'user/profile/settings') {
        this.activeComponent = 'settings';
      } else if (url === 'user/profile/identity') {
        this.activeComponent = 'identity';
      } else if (url === 'user/profile/payment') {
        this.activeComponent = 'payment';
      } else {
        // Set a default value or handle other cases if needed
      }
    });
  }

  setActiveComponent(component: string) {
    this.activeComponent = component;
  }
}

