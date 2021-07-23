import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import { FileUploader } from 'ng2-file-upload';
//const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';
@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss', '../../../assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectNewComponent implements OnInit {

/*   uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true
  });
  hasBaseDropZoneOver = false;
  hasAnotherDropZoneOver = false;

  // Angular2 File Upload
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  } */
  generalFormSubmitted = false;
  generalForm = new FormGroup({
    username: new FormControl('hermione007', [Validators.required]),
    name: new FormControl('Hermione Granger', [Validators.required]),
    email: new FormControl('granger007@hogward.com', [Validators.required]),
    company: new FormControl('', [Validators.required])
  });
  infoFormSubmitted = false;
  alertVisible = true;
  constructor() { }

  ngOnInit(): void {
  }

  get gf() {
    return this.generalForm.controls;
  }

onGeneralFormSubmit() {
    this.generalFormSubmitted = true;
    if (this.generalForm.invalid) {
      return;
    }
  }
}
