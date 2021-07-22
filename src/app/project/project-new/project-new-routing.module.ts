import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectNewComponent } from './project-new.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectNewComponent,
        data: {
            title: 'ProjectEdit'
        },

    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectNewRoutingModule { }
