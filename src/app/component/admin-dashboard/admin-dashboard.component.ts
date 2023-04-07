import { Component,OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { AdminUsersComponent } from '../admin-users/admin-users.component';
import { AdminPostsComponent } from '../admin-posts/admin-posts.component';
import { AdminRequestsComponent } from '../admin-requests/admin-requests.component';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{
  currentComponent: any;
  @ViewChild('mainContent', { read: ViewContainerRef }) readonly mainContent!: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}
  ngOnInit(){
    this.changeComponent('users')
  }

  changeComponent(componentName: string): void {
    switch (componentName) {
      case 'users':
        this.currentComponent = AdminUsersComponent;
        break;
      case 'posts':
        this.currentComponent = AdminPostsComponent;
        break;
      case 'requests':
        this.currentComponent = AdminRequestsComponent;
        break;
      // Add more cases for other components
      default:
        this.currentComponent = null;
    }

    this.mainContent.clear();

    if (this.currentComponent) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.currentComponent);
      const componentRef = this.mainContent.createComponent(factory);
    }
  }

}
