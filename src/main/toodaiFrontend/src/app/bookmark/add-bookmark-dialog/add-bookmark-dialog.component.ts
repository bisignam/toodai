import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'add-bookmark-dialog',
  templateUrl: './add-bookmark-dialog.component.html',
  styleUrls: ['./add-bookmark-dialog.component.scss'],
})
export class AddBookmarkDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddBookmarkDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
