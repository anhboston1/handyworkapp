import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProjectNewRoutingModule } from './project-new-routing.module';
import { ProjectNewComponent } from './project-new.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [ProjectNewComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    ProjectNewRoutingModule
  ]
})
export class ProjectNewModule { }
