import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-confirmdelete',
  imports: [MatDialogModule,MatIconModule,MatButtonModule],
  templateUrl: './confirmdelete.component.html',
  styleUrl: './confirmdelete.component.css'
})
export class ConfirmdeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmdeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmDelete(): void {
    this.dialogRef.close(true);
  }
}