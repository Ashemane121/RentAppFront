import { Component} from '@angular/core';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  activeComponent = 'utilisateurs'; 

  setActiveComponent(component: string) {
    this.activeComponent = component;
  }
  

}
