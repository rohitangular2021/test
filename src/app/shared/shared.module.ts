import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogboxComponent } from './components/confirm-dialogbox/confirm-dialogbox.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [ConfirmDialogboxComponent],
  imports: [
    CommonModule,MaterialModule
  ]
})
export class sharedModule { }
