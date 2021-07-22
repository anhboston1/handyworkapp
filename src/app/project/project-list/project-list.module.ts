import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list.component';
import { ProjectListRoutingModule } from './project-list-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PipeModule } from 'app/shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    ProjectListRoutingModule,
    NgxDatatableModule,
    PipeModule
  ],
  declarations: [
    ProjectListComponent
]
})
export class ProjectListModule { }
