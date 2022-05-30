import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialogbox',
  templateUrl: './confirm-dialogbox.component.html',
  styleUrls: ['./confirm-dialogbox.component.css']
})
export class ConfirmDialogboxComponent implements OnInit {
 title: string;
 message: string;
 
 constructor(public dialogRef: MatDialogRef<ConfirmDialogboxComponent>,
  @Inject(MAT_DIALOG_DATA) public data) {
  // Update view with given values
  this.title = data.title;
  this.message = data.message;
}

  ngOnInit(): void {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }

}
