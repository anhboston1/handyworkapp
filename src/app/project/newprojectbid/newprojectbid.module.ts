import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewprojectbidRoutingModule } from './newprojectbid-routing.module';
import { NewprojectbidComponent } from './newprojectbid.component';

@NgModule({
  declarations: [NewprojectbidComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NewprojectbidRoutingModule
  ]
})
export class NewprojectbidModule { }
