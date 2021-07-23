import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProjectNewRoutingModule } from './project-new-routing.module';
import { ProjectNewComponent } from './project-new.component';

@NgModule({
  declarations: [ProjectNewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectNewRoutingModule
  ]
})
export class ProjectNewModule { }
