import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from 'src/app/service/upload/upload.service';

@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.css']
})
export class ImageDisplayComponent implements OnInit{
  @Input() imageRef: string='';
  imageUrl: any;
  constructor(
    private activeModal: NgbActiveModal,
    private uploadService: UploadService
  ) { }
   
  ngOnInit() {
    this.uploadService.GetImageByRef(this.imageRef)
    .subscribe(
      (response:any) => {
        const reader = new FileReader();
        reader.readAsDataURL(response);
        reader.onloadend = () => {
          this.imageUrl = reader.result as string; // save the image URL to a property on the post object
        };
      }
    )
  }
  closeModal() {
    this.activeModal.close();
  }

}
