import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewprojectbidComponent } from './newprojectbid.component';

const routes: Routes = [
    {
        path: '',
        component: NewprojectbidComponent,
        data: {
            title: 'Bid Project'
        },

    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewprojectbidRoutingModule { }
