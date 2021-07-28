import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss', '../../../assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectNewComponent implements OnInit {

  services = [
    { id: 1, name: 'Plumping' },
    { id: 2, name: 'Kitchen' },
    { id: 3, name: 'Bathrooms' },
    { id: 4, name: 'Winows & Doors' },
    { id: 5, name: 'Roofing' },
    { id: 5, name: 'Gutters' },
    { id: 6, name: 'Electrical' },
    { id: 7, name: 'Landscape' },
    { id: 5, name: 'Painting' },
    { id: 5, name: 'Swimming Pool' },
    { id: 5, name: 'Concrete, Brick, Stone' },
    { id: 5, name: 'Decks & Porches' },
    { id: 5, name: 'Siding' },
    { id: 5, name: 'Fences' },
    { id: 5, name: 'Flooring' },
    { id: 5, name: 'HVAC' },
    { id: 5, name: 'Tile' },
    { id: 5, name: 'Walls / Ceiling' },
    { id: 5, name: 'Additions & Remodels' },
  ];
  selectedService: any = { id: 1, name: 'Plumping' };

  generalFormSubmitted = false;
  generalForm = new FormGroup({
    projectname: new FormControl('Name your project', [Validators.required]),
    projectdescription: new FormControl('Describe your project', [Validators.required]),
    street: new FormControl('Street', [Validators.required]),
    city: new FormControl('City', [Validators.required]),
    zipcode: new FormControl('Zipcode', [Validators.required])
  });
  infoFormSubmitted = false;
  alertVisible = true;
  constructor(private projectService: ProjectService) { }

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

    let data = {
      name: this.generalForm.value.projectname,
      description:  this.generalForm.value.projectdescription,
      status: "Approved",
      service_category: this.selectedService.name,
      street:  this.generalForm.value.street,
      city:  this.generalForm.value.city,
      zipcode:  this.generalForm.value.zipcode,
      userId: "5cbdf2d2-327a-4dd0-a18d-aa1e47043856"
    }
    console.log("data = ", data);
    console.log("generalForm =", this.generalForm);
    //Post project
    this.projectService.create(data).subscribe((res) => {
      alert(JSON.stringify(res));
    })
    //Upload file
  }
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    console.log("this.selectedFiles = ", this.selectedFiles);
  }
}
