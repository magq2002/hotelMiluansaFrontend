import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInComponent } from './check-in.component';
import { MaterialModule } from '../../../material/material.module';
import { CreateEditCheckInComponent } from './components/create-edit-check-in/create-edit-check-in.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CheckInComponent,
    CreateEditCheckInComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class CheckInModule { }
