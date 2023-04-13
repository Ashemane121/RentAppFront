import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RentalService } from 'src/app/service/rental/rental.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-rental-info',
  templateUrl: './rental-info.component.html',
  styleUrls: ['./rental-info.component.css']
})
export class RentalInfoComponent implements OnInit{
  id: number = 0
  request:any = {
    payment_method:'',
    status:'',
    start_date:'',
    end_date:'',
    post: {
      brand:'',
      model:'',
      mileage:'',
      year:'',
      description:'',
      gearbox:'',
      fuel:'',
      price:'',
      availability:'',
      start_date:'',
      end_date:''
    }
  }
  isLoggedIn=false

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private rentalService: RentalService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id!==null){
        this.id = +id;
        //checks if the user is logged in
        if (this.authService.IsLoggedIn()) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
        //fetchs request data
        this.rentalService.GetRequestById(this.id, sessionStorage.getItem('token')).subscribe((response:any) => {
          this.request=response
        })
      } else {
        this.toastr.error('Demande de location introuvable')
        this.router.navigate(['rental/owned'])
      }
    });
    
  }


}
