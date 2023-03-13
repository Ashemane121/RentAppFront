import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.service.refreshComponent$.subscribe(() => {
      console.log('refreshed home')
      // Add the code here that you want to execute when the event is emitted
    });
  }

}
