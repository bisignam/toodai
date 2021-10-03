import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-bookmark-dialog',
  templateUrl: './delete-bookmark-dialog.component.html',
  styleUrls: ['./delete-bookmark-dialog.component.scss'],
})
export class DeleteBookmarkDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteBookmarkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
