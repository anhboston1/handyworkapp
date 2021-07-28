import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectbidsComponent } from './projectbids.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectbidsComponent,
        data: {
            title: 'Project Bids'
        },

    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectbidRoutingModule { }
