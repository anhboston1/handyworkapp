import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectbidRoutingModule } from './projectbid-routing.module';
import { ProjectbidsComponent } from './projectbids.component';

@NgModule({
  declarations: [ProjectbidsComponent],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    ProjectbidRoutingModule
  ]
})
export class ProjectbidModule { }
