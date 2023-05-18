import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { RentalService } from 'src/app/service/rental/rental.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr'
import { FormControl } from '@angular/forms';
import { ClaimService } from 'src/app/service/claim/claim.service';

@Component({
  selector: 'app-rental-claim',
  templateUrl: './rental-claim.component.html',
  styleUrls: ['./rental-claim.component.css']
})
export class RentalClaimComponent implements OnInit{
  @Input() rentalId: number=0
  rental:any = {
    request: {
      post : {
        brand :'',
        model :''
      }
    }
  }
  
  subjectControl=new FormControl('')
  typeControl=new FormControl('')
  claimStatus =''

  hasClaim:boolean=false
  updating:boolean=false

  constructor(
    private authService: AuthService,
    private rentalService: RentalService,
    private claimService : ClaimService,
    private activeModal : NgbActiveModal,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {

  }
  ngOnInit() {
    if (this.authService.IsLoggedIn()) {
      this.rentalService.GetRentalById(this.rentalId)
      .subscribe((response:any) => {
        this.rental=response
        //check claim
        if (this.rental.claim) {
          this.hasClaim=true
          this.claimStatus=this.rental.claim.status
          this.subjectControl.setValue(this.rental.claim.subject)
          this.typeControl.setValue(this.rental.claim.type)
        }
      })
    }
    
  }

  addClaim(){
    if (this.authService.IsLoggedIn()) {
      if (this.subjectControl.value && this.typeControl.value) {
        const claimvalues = {
          type : this.typeControl.value,
          subject : this.subjectControl.value,
          status : 'Pending' 
        }        
        this.claimService.AddClaim(this.rental.id_rental, claimvalues, sessionStorage.getItem('token'))
        .subscribe((response:any) => {
          this.toastr.success('Réclamation ajoutée!')
          this.refreshModal()
        });
      } else {
        this.toastr.warning('Veuillez entrer des données valides!')
      }
    } else {
      this.toastr.error('Veuillez vous connecter')
    }

  }

  updateClaim(){
    if (this.authService.IsLoggedIn()) {
      if (this.subjectControl.value && this.typeControl.value) {
        const claimvalues = {
          type : this.typeControl.value,
          subject : this.subjectControl.value,
          status : 'Pending' 
        }        
        this.claimService.UpdateClaim(this.rental.claim.id_claim, claimvalues, sessionStorage.getItem('token'))
        .subscribe((response:any) => {
          this.toastr.success('Réclamation modifiée!')
          this.refreshModal()
        });
      } else {
        this.toastr.warning('Veuillez entrer des données valides!')
      }
    } else {
      this.toastr.error('Veuillez vous connecter')
    }
  }

  toggleUpdate() {
    this.updating = !this.updating
    if (this.updating) {

    } else {
      this.refreshModal()
    }
  }

  closeModal() {
    this.activeModal.close();
  }
  refreshModal() {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(RentalClaimComponent, { size: 'md', animation: false });
    modalRef.componentInstance.rentalId = this.rental.id_rental;
  }
  

}
