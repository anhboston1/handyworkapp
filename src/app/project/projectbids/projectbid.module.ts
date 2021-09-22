import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectbidRoutingModule } from './projectbid-routing.module';
import { ProjectbidsComponent } from './projectbids.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [ProjectbidsComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ProjectbidRoutingModule,
    NgbModule
  ]
})
export class ProjectbidModule { }
