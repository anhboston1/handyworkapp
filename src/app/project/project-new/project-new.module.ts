import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectNewRoutingModule } from './project-new-routing.module';
import { ProjectNewComponent } from './project-new.component';

@NgModule({
  declarations: [ProjectNewComponent],
  imports: [
    CommonModule,
    ProjectNewRoutingModule
  ]
})
export class ProjectNewModule { }
